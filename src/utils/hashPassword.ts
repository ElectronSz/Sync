import bcrypt from "bcryptjs";

const hashedPassword =  async (password: string) => {

    return await bcrypt.hash(password, 10);
} 

export { hashedPassword}