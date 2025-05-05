import axios from 'axios'

export const postleave = async (formData: FormData) => {
  try {
    const res = await axios.post('http://localhost:3050/addLeave', formData)
    console.log('leave api response:', res)
    return res
  } catch (err: any) {}
}
export const getleave = async () => {
  try {
    const res = await axios.get('http://localhost:3050/getLeaves')
    console.log('leave api response:', res)
    return res
  } catch (err: any) {}
}
