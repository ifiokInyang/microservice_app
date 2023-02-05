import CustomerService from "../services/customer-service";
import express, { Application, NextFunction, Request, Response } from "express";

export const Customer = (app: Application) => {
    const service = new CustomerService()

    app.post("/customer/signUp", async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const { email, password, phone } = req.body
            //JOI validation here

            const data  = await service.SignUp({email, password, phone})

            return res.status(201).json({data})
        } catch (error) {
            next(error)
            // throw new Error()
        }
    })

    app.post("/customer/login", async (req: Request, res: Response, next: NextFunction) =>{
        try {
            const { email, password } = req.body
            //JOI validation here

            const data  = await service.Login({email, password})

            return res.status(200).json({message: "Login attempt successful", data})
        } catch (error) {
            // return res.json({error})
            next(error)
            // throw new Error()
        }
    })
    app.get("/customer/getCustomers", async (req: Request, res: Response, next: NextFunction) =>{
        try {
            // const { email, password, phone } = req.body
            //JOI validation here

            const data  = await service.getAllUsers()

            return res.status(200).json({data, message: "Successfully fetched all users"})
        } catch (error) {
            next(error)
            // throw new Error()
        }
    })
}