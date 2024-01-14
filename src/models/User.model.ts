import { db } from "../../db/config";
import { User } from "../types/User";

//get all users
const getUsers = async () => {
    const users: User[] = await db.user.findMany();

    return users;
}

//get all one user
const getUser = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email: email
        }
    });

    return user;
}

//create user
const createUser = async (user: User) =>{

    const createdUser = db.user.create({
        data: user
    })

    return createdUser;
}

export { getUsers, createUser, getUser}