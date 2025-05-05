import { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaRegSquare } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { LoginProps } from './types/auth.type'
import { loginUser } from '../api/loginUser'
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [payload, setpayload] = useState<LoginProps>({
    Email: ' ',
    Password: ' '
  })
  const navigate = useNavigate()

  const handleLoginUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await loginUser({
        Email: payload.Email,
        Password: payload.Password
      })
      console.log('41 response', response)
      const token = response?.data?.token
      localStorage.setItem('token', token)
      navigate('/Candidate')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen bg-white flex flex-col overflow-hidden'>
      <div className='flex items-center justify-center gap-3 py-2'>
        <FaRegSquare className='size-6 text-purple-600' />
        <h1 className='text-3xl font-bold text-purple-600'>Logo</h1>
      </div>

      <div className='flex-1 flex items-center justify-center px-4 md:px-8'>
        <div className='w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden bg-white max-h-[85vh]'>
          <div className='hidden md:block md:w-1/2 bg-purple-800 p-6 text-white'>
            <img
              src='src/assets/images/dashboardpreview.jpg'
              alt='Dashboard Preview'
              className='rounded-lg mb-4 w-full h-64 object-cover'
            />
            <h2 className='text-2xl font-bold mb-2 text-center'>
              Lorem ipsum dolor sit amet
            </h2>
            <p className='text-sm text-center'>
              Tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam.
            </p>
            <div className='flex justify-center mt-4 space-x-2'>
              <div className='w-2 h-2 bg-white rounded-full'></div>
              <div className='w-2 h-2 bg-white/50 rounded-full'></div>
              <div className='w-2 h-2 bg-white/50 rounded-full'></div>
            </div>
          </div>
          <div className='w-full md:w-1/2 p-6 sm:p-8 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-6 text-center md:text-left'>
              Welcome to Dashboard
            </h2>
            <form className='space-y-4'>
              <div>
                <label className='block mb-1 text-sm font-medium'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='w-full border border-gray-300 px-4 py-2 rounded-md outline-none'
                  placeholder='Email'
                  onChange={e =>
                    setpayload(prev => ({ ...prev, Email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className='relative'>
                <label className='block mb-1 text-sm font-medium'>
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='w-full border border-gray-300 px-4 py-2 rounded-md pr-10'
                  placeholder='Password'
                  onChange={e =>
                    setpayload(prev => ({ ...prev, Password: e.target.value }))
                  }
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-[38px] text-gray-500'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
              <div className='py-2'>
                <span className='text-gray-500'>Forget password?</span>
              </div>
              <button
                onClick={e => handleLoginUser(e)}
                className='bg-purple-800 text-white py-1 px-8 rounded-full hover:bg-purple-700 transition'
              >
                Login
              </button>
              <p className='text-gray-500'>
                Don't have an account?{' '}
                <Link to='/' className='text-purple-600 font-semibold'>
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
