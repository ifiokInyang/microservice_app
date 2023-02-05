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

    async FindCustomer({email}:{email: string}){
        const existingCustomer = await CustomerModel.findOne({email})
        return existingCustomer;
    }
    async FindAllCustomers(){
        const customers = await CustomerModel.find({})
        return customers;
    }
}