import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import Header from '../components/header/Header'
const Layout = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='w-64'>
        <Sidebar />
      </div>
      <main className='flex-1 p-4 bg-white'>
        <Header />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
