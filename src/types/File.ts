import { Decimal } from "@prisma/client/runtime/library"
import { Mime } from "./Mime"
import { User } from "./User"

type File = {
    id: number
    name: string
    size: Decimal
    version: string
    mimeId?: number
    mime?: Mime
    status?: boolean
    userId?: number
    user?: User | null | undefined
    createdAt?: Date
    updatedAt?: Date
}

export { File }