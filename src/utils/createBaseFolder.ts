import fs from "fs"
import path from "path"
import { db } from "../../db/config";

const createUserFolder = async (baseFolder: string, email: string) => {
  const userFolderPath = path.resolve(path.join(baseFolder,email))

  try {
  
    if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath, {
          mode: 0o744
        });

        //save target
        const target: any = await db.target.create({
          data: {
            dir: userFolderPath,
            user: {
              connect: {
                email: email
              }
            }
          }
        });

        console.log(`User folder created: ${userFolderPath} user: ${target.userId}`);
      }


  } catch (error: any) {
    console.error(`Error creating user folder: ${error.message}`);
    throw error; // Rethrow to allow handling at a higher level
  }
};

export { createUserFolder }