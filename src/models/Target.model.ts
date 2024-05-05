import { db } from "../../db/config";
import { Target } from "../types/Target";

//get all target dir for user
const getTarget = async (userId: number) => {
    const target: Target | null = await db.target.findUnique({
        where: {
            userId: userId
        }
    });

    return target;
}

//create target for user
const createTarget = async (target: any) => {

    const userId = target.userId;
    delete target["userId"];

    const createdTarget: Target = await db.target.create({
        data: {
            ...target,
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

    return createdTarget;
}

export { getTarget, createTarget }