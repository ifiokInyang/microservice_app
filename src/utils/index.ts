import { hash, genSalt, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { APP_SECRET } from "../config";
import { Request, Response } from "express";


export const GenerateSalt = async () => {
    return await genSalt()
}

export async function GeneratePassword(password: string, salt: string){
    return await hash(password, salt)
}

export const GenerateSignature = async(payload: string | object | Buffer) => {
    return await sign(payload, APP_SECRET, {expiresIn: "1d"})
}

export async function FormatData(data: any) {
    if(data){
        return data;
    }
    throw new Error("Data not found")
}

export const ComparePassword = async (enteredPassword: string, savedPassword:string, salt: string) => {
    return (await GeneratePassword(enteredPassword, salt) === savedPassword)
}

export const ValidateSignature = async (req: Request | any) => {
    try {
        const signature = req.get("Authorization")
        console.log(signature)
        const payload = verify(signature.split(" ")[1], APP_SECRET)

        req.user = payload;

        return true
    } catch (error) {
        throw new Error(`${error}`)
    }
}