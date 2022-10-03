import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  }
},{ timestamps: true });

// // static create admin method
// userSchema.statics.createAdmin = async function ( name, age, email, password ) {
//   if (!name || !age || !email || !password) {
//     throw new Error('All fields must be filled');
//   }

//   const adminAlreadyExist = await this.findOne({ isAdmin: true });

//   if (adminAlreadyExist) {
//     throw new Error('Admin already exists');
//   }

//   const exist = await this.findOne({ email });

//   if (exist) {
//     throw new Error('User with such email exists');
//   }

//   const admin = await this.create({ name, age, email, password, isAdmin: true });

//   return admin;
// }

export const User = mongoose.model('User', userSchema);