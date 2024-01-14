import { db } from "../../db/config";
import { Source } from "../types/Source";

//get all sources for user
const getSources = async (userId: number) => {
    const sources: Source[] = await db.source.findMany({
        where: {
            userId: userId
        }
    });

    return sources;
}

//create source for user
const createSource = async (source: any) => {

    const userId = source.userId;
    delete source["userId"];

    const createdSource = await db.source.create({
        data: {
            ...source,
            user: {
                connect: {
                    id: userId
                }
            },

        },
        select: {
            dir: true,
            id: true,
            status: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            user: false
        }
    })

    return createdSource;
}

export { getSources, createSource }