import axios from 'axios'
import { RegisterProps } from '../auth/types/auth.type'

export const RegisterUser = async ({
  Name,
  Email,
  Password
}: RegisterProps) => {
  const url = 'http://localhost:3050/register'
  try {
    const response = await axios.post(url, {
      name: Name,
      email: Email.trim(),
      password: Password
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
