import { db } from "../../db/config";
import { File } from "../types/File"

//get all files
const getFiles = async (userId: number) => {
    const files: File[] = await db.file.findMany({
        where: {
            user: {
                id: userId
            }
        }
    });

    return files;
}

//get all one file
const getFile = async (fileId: number) => {
    const file = await db.file.findUnique({
        where: {
            id: fileId
        }
    });

    return file;
}

//create file
const createFile = async (file: File) =>{

    const createdFile = db.file.create({
        data: {
            name: file.name,
            size: file.size,
            version: file.version,
            mimeId: file.mimeId!,
            user: {
                connect: {
                    id: file.userId
                }
            }
        }
    })

    return createdFile;
}

export { getFiles, getFile, createFile}