import axios from 'axios'

export const getEmployees = async () => {
  try {
    const response = await axios.get('http://localhost:3050/getAttendance')
    return response
  } catch (error) {
    console.error('Error fetching attendance:', error)
    return null
  }
}
