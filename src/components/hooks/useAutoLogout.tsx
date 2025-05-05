import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const useAuthCheck = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    try {
      const { exp } = jwtDecode(token)

      if (exp && typeof exp === 'number') {
        const timeLeft = exp * 1000 - Date.now()

        if (timeLeft <= 0) {
          localStorage.removeItem('token')
          navigate('/login')
        } else {
          const timer = setTimeout(() => {
            localStorage.removeItem('token')
            navigate('/login')
          }, timeLeft)

          return () => clearTimeout(timer)
        }
      } else {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } catch (error) {
      localStorage.removeItem('token')
      navigate('/login')
      console.error('Invalid token', error)
    }
  }, [navigate])
}
