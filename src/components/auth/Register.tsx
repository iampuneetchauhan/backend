import { useEffect, useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaRegSquare } from 'react-icons/fa6'
import { Link, useNavigate } from 'react-router-dom'
import { PasswordType, RegisterProps } from './types/auth.type'
import { RegisterUser } from '../api/registerUser'
const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState<PasswordType>({
    show: false,
    password: ''
  })
  const [showConfirm, setShowConfirm] = useState<PasswordType>({
    show: false,
    password: ''
  })
  const navigate = useNavigate()
  const [payload, setpayload] = useState<RegisterProps>({
    Name: '',
    Email: ' ',
    Password: ' '
  })
  console.log(payload)
  const handleRegisterUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('function called at register')
    e.preventDefault()
    try {
      const response = await RegisterUser({
        Name: payload.Name,
        Email: payload.Email,
        Password: payload.Password
      })
      if (response?.status == 200) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      showConfirm.password === showPassword.password &&
      showPassword.password.length > 0
    ) {
      setpayload(prev => ({ ...prev, Password: showConfirm.password }))
    }
  }, [showPassword.password, showConfirm.password])

  return (
    <div className='min-h-screen bg-white flex flex-col overflow-hidden'>
      <div className='flex items-center justify-center gap-3 py-2'>
        <FaRegSquare className='size-6 text-purple-600' />
        <h1 className='text-3xl font-bold text-purple-600'>Logo</h1>
      </div>

      <div className='flex-1 flex items-center justify-center px-4 md:px-8'>
        <div className='w-full max-w-6xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden bg-white max-h-[85vh]'>
          <div className='hidden md:block md:w-1/2 bg-purple-800 p-8 text-white'>
            <img
              src='src/assets/images/dashboardpreview.jpg'
              alt='Dashboard Preview'
              className='rounded-lg pb-6 w-full h-auto object-cover'
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
          <div className='w-full md:w-1/2 p-6 sm:p-10'>
            <h2 className='text-xl font-semibold mb-6 text-center md:text-left'>
              Welcome to Dashboard
            </h2>
            <form className='space-y-1'>
              <div>
                <label className='block mb-1 text-sm font-medium'>
                  Full Name
                </label>
                <input
                  type='text'
                  className='w-full border border-gray-300 px-4 py-2 rounded-md outline-none'
                  placeholder='Full Name'
                  required
                  onChange={e =>
                    setpayload(prev => ({
                      ...prev,
                      Name: e.target.value
                    }))
                  }
                />
              </div>
              <div>
                <label className='block mb-1 text-sm font-medium'>
                  Email Address
                </label>
                <input
                  type='email'
                  className='w-full border border-gray-300 px-4 py-2 rounded-md outline-none'
                  placeholder='Email'
                  onChange={e =>
                    setpayload(prev => ({
                      ...prev,
                      Email: e.target.value
                    }))
                  }
                  required
                />
              </div>
              <div className='relative'>
                <label className='block mb-1 text-sm font-medium'>
                  Password
                </label>
                <input
                  type={showPassword.show ? 'text' : 'password'}
                  className='w-full border border-gray-300 px-4 py-2 rounded-md pr-10'
                  placeholder='Password'
                  onChange={e =>
                    setShowPassword(prev => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-[38px] text-gray-500'
                  onClick={() =>
                    setShowPassword(prev => ({ ...prev, show: !prev.show }))
                  }
                >
                  {showPassword.show ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
              <div className='relative'>
                {showPassword.password !== showConfirm.password && (
                  <p className='text-red-500 text-sm mt-1'>
                    Password doesn't match
                  </p>
                )}
                <label className='block mb-1 text-sm font-medium'>
                  Confirm Password
                </label>
                <input
                  type={showConfirm.show ? 'text' : 'password'}
                  className='w-full border border-gray-300 px-4 py-2 rounded-md pr-10'
                  placeholder='Confirm Password'
                  onChange={e =>
                    setShowConfirm(prev => ({
                      ...prev,
                      password: e.target.value
                    }))
                  }
                  required
                />
                <button
                  type='button'
                  className='absolute right-3 top-[38px] text-gray-500'
                  onClick={() =>
                    setShowConfirm(prev => ({ ...prev, show: !prev.show }))
                  }
                >
                  {showConfirm.show ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
              <button
                onClick={e => handleRegisterUser(e)}
                className=' bg-purple-800 text-white py-1 px-8 rounded-full hover:bg-purple-700 transition'
              >
                Register
              </button>
              <p className='text-gray-500'>
                Already have an account?{' '}
                <Link to='/login' className='text-purple-600 font-semibold'>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
