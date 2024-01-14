import { Source } from "./Source";

type User =  {
    id: number;
    email: string;
    password: string;
    name: string | null
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date
    source?: Source[]
}
 
export { User }