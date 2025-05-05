import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import LogoutModal from '../modal/LogoutModal'
import { useState } from 'react'

const Sidebar = () => {
  const location = useLocation()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const isActive = (path: string) => location.pathname === path

  const activeClass = 'bg-purple-100 text-purple-700 font-medium'
  const inactiveClass = 'text-gray-700 hover:bg-gray-100'

  return (
    <div className='flex flex-col min-h-screen bg-white border-r shadow-md border-gray-300 px-2 py-5'>
      <div className='flex items-center justify-center'>
        <div className='text-xl font-bold text-purple-600 pb-6'>LOGO</div>
      </div>

      <div className='my-3 relative'>
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500' />
        <input
          name='search'
          type='search'
          placeholder='Search Doc'
          className='pl-10 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm/6'
        />
      </div>

      <nav className='flex-1 text-sm space-y-8'>
        <div>
          <h3 className='text-xs text-gray-500 px-3 uppercase mb-2'>
            Recruitment
          </h3>
          <ul className='space-y-1'>
            <Link
              to='/Candidate'
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/Candidate') ? activeClass : inactiveClass
              }`}
            >
              <UserIcon className='h-5 w-5 mr-3' />
              Candidates
            </Link>
          </ul>
        </div>

        <div>
          <h3 className='text-xs text-gray-500 px-3 uppercase mb-2'>
            Organization
          </h3>
          <ul className='space-y-1'>
            <Link
              to='/Employees'
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/Employees') ? activeClass : inactiveClass
              }`}
            >
              <UserGroupIcon className='h-5 w-5 mr-3' />
              Employees
            </Link>
            <Link
              to='/Attendence'
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/Attendence') ? activeClass : inactiveClass
              }`}
            >
              <BuildingOffice2Icon className='h-5 w-5 mr-3' />
              Attendance
            </Link>
            <Link
              to='/Leaves'
              className={`flex items-center px-3 py-2 rounded-md ${
                isActive('/Leaves') ? activeClass : inactiveClass
              }`}
            >
              <CalendarDaysIcon className='h-5 w-5 mr-3' />
              Leaves
            </Link>
          </ul>
        </div>

        <div>
          <h3 className='text-xs text-gray-500 px-3 uppercase mb-2'>Others</h3>
          <ul>
            <p
              className='flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md'
            onClick={()=>setOpenDeleteModal(true)}>
              <ArrowRightOnRectangleIcon className='h-5 w-5 mr-3' />
              Logout
            </p>
          </ul>
        </div>
      </nav>
      <LogoutModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      ></LogoutModal>
    </div>
  )
}

export default Sidebar
