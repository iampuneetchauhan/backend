import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const registerUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


registerUserSchema.methods.generateToken = function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id.toString(),
        email: this.email
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '2h'
      }
    );
    return token;
  } catch (error) {
    console.error("Token generation error:", error);
    return null;
  }
};

const RegisterUserModel = model("registerUser", registerUserSchema);

export default RegisterUserModel;
