import mongoose, { Schema } from "mongoose";

export interface CustomerAttributes{
    email: string,
    password: string,
    salt: string,
    phone: string,
}

const CustomerSchema = new Schema({
    email: String,
    password: String,
    salt: String,
    phone: String,


}, {
    toJSON: {
        transform(doc, ret){
            delete ret.password
            delete ret.salt
        }
    },
    timestamps: true
})

export const CustomerModel = mongoose.model<CustomerAttributes>("customer", CustomerSchema)