import { PrismaClient } from "@prisma/client";
import { User } from "../src/types/User";
import { hashedPassword } from "../src/utils/hashPassword";

const db = new PrismaClient({
    log: ['query', 'warn', 'error']
});

// Add a middleware to Prisma Client ...
db.$use(async (params, next) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
  
    console.log(
      `Query [${params.model}.${params.action}] took ${after - before}ms`
    );
    return result;
  });

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