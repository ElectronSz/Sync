import fs from 'fs';
import path from 'path';
import { watch } from 'fs';
import { async } from 'sync-directory';
import { getTarget } from '../models/Target.model';
import { getMimetype } from './mimeType';
import { createFile } from '../models/File.model';
import { File } from '../types/File';
import { Decimal } from '@prisma/client/runtime/library';

// Function to sync each source directory (including subdirectories)
async function syncDirectory(srcDir: any, userId: number) {

    //get targetDir
    const targetDir: string = await getTarget(userId);

    const delay = (time = 2000) => new Promise(r => setTimeout(r, time));
    try {
        console.log(`Syncing directory ${srcDir}...`);
        await async(srcDir, targetDir, {
            async afterEachSync() {
                await delay(2000); // Delay 2s after each file/folder sync
            },
        });
        console.log(`Sync complete for ${srcDir}`);

        // Recursively watch subdirectories:
        const files = await fs.promises.readdir(srcDir, { withFileTypes: true });
        for (const file of files) {
            if (file.isDirectory()) {

                const filePath = path.join(srcDir, file.name);
                const fileStats = await fs.promises.stat(filePath);
                const mimeType = await getMimetype(filePath); 

                const fileObj: File = {
                    id: 0,
                    name: filePath,
                    size: new Decimal(fileStats.size),
                    version: '1.0',
                    mimeId: 1
                }
                try {
                    await createFile(fileObj);
                  } catch (error) {
                    console.error(`Error adding file ${fileObj.name} to database:`, error);
                  }
                const subdir = path.join(srcDir, file.name);
                const subdirWatcher = watch(subdir, { recursive: true }, (eventType, filename) => {
                    if (eventType === 'change' || eventType === 'rename') {
                        console.log(`File ${filename} changed or added in ${subdir}. Syncing...`);
                        syncDirectory(subdir, userId);
                    }
                });

                subdirWatcher.on('error', (error) => {
                    console.error(`File watcher error for ${subdir}:`, error);
                });
            }
        }
    } catch (error) {
        console.error(`Sync error for ${srcDir}:`, error);
    }
}

// Export the syncDirectory function for use in other files
export { syncDirectory };
