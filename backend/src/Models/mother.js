// models/Mother.js
import mongoose, { Schema } from "mongoose";

const motherSchema = new Schema({
    name: {
        type: String,required: true
    },
    age: {
        type: Number
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    deliveryType: {
        type: String
    },
    deliveryDate: {
        type: Date
    },
    address: {
        type: String
    },
    emergencyContactName: {
        type: String
    },
    emergencyContactPhone: {
        type: String
    },
    phoneNo: {
        type: String, required:true,unique:true
    },
    email: {
        type: String, required:true,unique:true
    },
    password: {
        type: String, required:true
    },
     commonKey: {
  type: Schema.Types.ObjectId,
  ref: "Login",
  required: true
}
}, {
    timestamps: true
});

const MOTHER = mongoose.model("Mother", motherSchema);
export default MOTHER