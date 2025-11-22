// import mongoose, { Schema } from "mongoose";

// const memberSchema = new Schema({
//     name: {
//         type: String,required: true
//     },
//     phoneNo: {
//         type: String, required:true,unique:true
//     },
//     relationship:{
//         type: String
//     },
//     email: {
//         type: String, required:true,unique:true
//     },
//     password: {
//         type: String, required:true
//     },
//      commonKey: {
//   type: Schema.Types.ObjectId,
//   ref: "Login",
//   required: true
// }
// }, {
//     timestamps: true
// });

// const MEMBER = mongoose.model("Member", memberSchema);
// export default MEMBER

import mongoose, { Schema } from "mongoose";

const memberSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  phoneNo: {
    type: String,
    required: true,
    unique: true
  },

  relationship: {
    type: String
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  commonKey: {
    type: Schema.Types.ObjectId,
    ref: "Login",
    required: true
  },

  // 🔥 NEW FIELD ↓
  isAvailable: {
    type: Boolean,
    default: true   // member is available by default
  }

}, {
  timestamps: true
});

const MEMBER = mongoose.model("Member", memberSchema);
export default MEMBER;
