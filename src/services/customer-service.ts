import { Request, Response } from "express";
import { CustomerRepository } from "../database";
import { CustomerInput, LoginCustomer } from "./customer-service.dto";
import { ComparePassword, FormatData, GeneratePassword, GenerateSalt, GenerateSignature} from "../utils"


//business logic

class CustomerService{
    repository
    constructor(){
        this.repository = new CustomerRepository()
    }

    async SignUp(userInput: CustomerInput){
        const { email, password, phone } = userInput
        try {
            const existingCustomer = await this.repository.FindCustomer({email});
            if (existingCustomer){
                throw new Error("Customer already exist")
            }

            //Generate salt
            let salt = await GenerateSalt()

            //Hash password
            let userPassword = await GeneratePassword(password, salt)

            const customer = await this.repository.CreateCustomer({email, password:userPassword, salt, phone})
            
            const token = await GenerateSignature({email, _id: customer?._id})

            return FormatData({customer, token });
        } catch (error) {
            console.log(error)
            throw new Error(`${error}`)
        }
    }

    async Login(userInput: LoginCustomer){
        const { email, password } = userInput
        try {
            const existingCustomer = await this.repository.FindCustomer({email});
            if (!existingCustomer){
                throw new Error("Not a registered customer")
            }

            const validatePassword = await ComparePassword(password, existingCustomer.password, existingCustomer.salt)

            if (!validatePassword){
                throw new Error("Incorrect login details")
            }
                        
            const token = await GenerateSignature({email, _id: existingCustomer?._id})

            return FormatData({existingCustomer, token });
        } catch (error) {
            console.log(error)
            throw new Error(`${error}`)
        }
    }
// /Users/decagon/MyProjects/microservice/customer/src/services/customer-service.ts
    async getAllUsers(){
        try {
            const customers = await this.repository.FindAllCustomers();
            return FormatData({customers})
        } catch (error) {
            
        }
    }
}

export default CustomerService;