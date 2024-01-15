import { db } from "../../db/config";
import { Mime } from "../types/Mime";

//get all mimes
const getMimes = async () => {
    const mimes: Mime[] = await db.mime.findMany();

    return mimes;
}

export { getMimes}