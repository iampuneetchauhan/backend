export interface RegisterProps {
  Name: string
  Email: string
  Password: string
}
export interface LoginProps {
  Email: string
  Password: string
}

export interface PasswordType {
  show: boolean
  password: string
}
