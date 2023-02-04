import { CustomerModel, CustomerAttributes } from "../models";


export class CustomerRepository{
    async CreateCustomer({email, password, salt, phone}:CustomerAttributes){
        try {
            const customer = await CustomerModel.create({
                email, password, salt, phone
            })
            return customer;
        } catch (error) {
            console.log(error)
        }
    }
}