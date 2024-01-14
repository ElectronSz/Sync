import { User } from "./User";

type Target = {
    id: number;
    dir: string
    status?: boolean;
    userId?: number;
    user?: User | null | undefined;
    createdAt?: Date;
    updatedAt?: Date
}

export { Target }
  