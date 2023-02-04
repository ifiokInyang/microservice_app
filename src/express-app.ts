import express, { Application, Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";



export const expressApp = async (app: Application) => {
    try {
        app.use(express.json());
        app.use(cors());
        app.use(logger("dev"));
        app.use(cookieParser())
    } catch (error) {
        console.log(error)
    }
}