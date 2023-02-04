import { hash, genSalt } from "bcrypt";


export const GenerateSalt = async () => {
    return await genSalt()
}