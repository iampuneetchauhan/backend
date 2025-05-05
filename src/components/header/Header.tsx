import { EnvelopeOpenIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  return (
    <div className=' w-full '>
      <nav className='flex justify-between'>
        {location.pathname && (
          <h1 className='text-xl'>
            {location.pathname.slice(1).charAt(0).toUpperCase() +
              location.pathname.slice(2)}
          </h1>
        )}

        <div className='flex items-center gap-4 px-10'>
          <EnvelopeOpenIcon className='size-6' />
          <BellAlertIcon className='size-6' />
          <div className='relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden'>
            <span className='absolute -inset-1.5' />
            <span className='sr-only'>Open user menu</span>
            <img
              alt=''
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              className='size-8 rounded-full'
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
