import { PrismaClient } from "@prisma/client";
import { User } from "../src/types/User";
import { hashedPassword } from "../src/utils/hashPassword";

const db = new PrismaClient();

db.$extends({
    model: {
        user: {
             async signUp(user: User){
                await db.user.create({
                    data: {
                        ...user,
                        password: await hashedPassword(user.password)
                    }
                })
             }
        }
    }
})

export { db }