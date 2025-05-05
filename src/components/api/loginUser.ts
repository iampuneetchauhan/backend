import axios from "axios"
import { LoginProps } from "../auth/types/auth.type"


export const loginUser = async({
  Email,
  Password
}:LoginProps) => {
  const url = 'http://localhost:3050/Login'
try {
      const response = await axios.post(url, {
        email: Email.trim(),
        password: Password
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }
