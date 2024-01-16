import mime from "mime"

async function getMimetype(filePath: string) {
  try {
    const mimeType = await mime.getType(filePath);
    return mimeType;
  } catch (error) {
    console.error(`Error getting MIME type for ${filePath}:`, error);
    return null; // Or return a default MIME type if preferred
  }
}

export { getMimetype }