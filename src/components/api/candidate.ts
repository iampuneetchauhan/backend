import axios from 'axios'

export const RegisterCandidate = async (formData: FormData) => {
  const url = 'http://localhost:3050/addCandidate'
  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export const getCandidates = async () => {
  const url = 'http://localhost:3050/getcandidates'
  try {
    const response = await axios.get(url)
    return response
  } catch (e) {
    console.log(e)
  }
}
