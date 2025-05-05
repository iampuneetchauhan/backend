import { Route, Routes } from 'react-router-dom'
import RegisterPage from '../components/auth/Register'
import LoginPage from '../components/auth/Login'
import Layout from '../layout/Layout'
import CustomPage from '../pages/Candidate Page/Candidate'

const Approutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route element={<Layout />}>
          <Route path='/Candidate' element={<CustomPage />}></Route>
          <Route path='/Employees' element={<CustomPage />}></Route>
          <Route path='/Attendence' element={<CustomPage />}></Route>
          <Route path='/Leaves' element={<CustomPage />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default Approutes
