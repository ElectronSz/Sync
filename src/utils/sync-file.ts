import { syncDirectory } from './sync-logic';
import { watch, promises as fs } from 'fs';

let watchers: Map<string, import('fs').FSWatcher> = new Map(); // Store watchers for cleanup
let shouldStopSync = false; // Flag to control sync

async function syncAndWatchFiles(srcDirs: string[]) {
  for (const srcDir of srcDirs) {
    try {
      await syncDirectory(srcDir); // Initial sync

      const watcher = watch(srcDir, { recursive: true }, (eventType, filename) => {
        if (eventType === 'change' || eventType === 'rename') {
          if (!shouldStopSync) { // Only sync if not stopped
            console.log(`File ${filename} changed or added in ${srcDir}. Syncing...`);
            syncDirectory(srcDir);
          }
        }
      });
      watcher.on('change', (filename) => {
        if (!shouldStopSync) { // Only sync if not stopped
          console.log(`File ${filename} changed. Syncing...`);
          syncDirectory(srcDir);
        }
      });
      watcher.on('error', (error) => {
        console.error(`File watcher error for ${srcDir}:`, error);
      });

      watchers.set(srcDir, watcher); // Store watcher for later cleanup
    } catch (error) {
      console.error(`Error syncing ${srcDir}:`, error);
    }

    if (shouldStopSync) {
      break; // Stop syncing if the flag is set
    }
  }
}

async function stopSyncing() {
  try {
    shouldStopSync = true; // Set the flag to stop ongoing syncs
    for (const [srcDir, watcher] of watchers) {
      watcher.close(); // Close all file watchers
      console.log(`Watcher for ${srcDir} closed.`);
    }
    watchers.clear(); // Clear the watcher map
  } catch (error) {
    console.error(`Error stopping sync:`, error);
  }
}

export { syncAndWatchFiles, stopSyncing };
