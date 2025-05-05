import { useState } from 'react'
import Dropdown from '../../components/dropdown/Dropdown'
import Searchbox from '../../components/searchbox/Searchbox'
import CandidateTable from '../../components/Table/Table'
import CandidateModal from '../../components/modal/CandidateModal'
import { useAuthCheck } from '../../components/hooks/useAutoLogout'
import { useLocation } from 'react-router-dom'
import { AppContextProvider } from '../../components/context/AppContext'
import CalendarComponent from '../../components/Calender/Calender'

const CustomPage = () => {
  const [openCandidateModal, setOpenCandidateModal] = useState<boolean>(false)
  const CandidateType = ['Status', 'New', 'Ongoing', 'Selected', 'Rejected']
  const CandidateRole = ['Position', 'Designer', 'Developer', 'Human Resource']
  useAuthCheck()
  const location = useLocation()

  return (
    <div className='pt-9'>
      {location.pathname === '/Candidate' && (
        <>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <Dropdown props={CandidateType} />
              <Dropdown props={CandidateRole} />
            </div>
            <div className='flex items-center pb-3 gap-2'>
              <Searchbox />
              <button
                type='button'
                className='rounded-full bg-purple-600 px-7 py-2 text-sm font-semibold text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
                onClick={() => setOpenCandidateModal(true)}
              >
                Add Candidate
              </button>
            </div>
          </div>
          <AppContextProvider>
            <CandidateTable TableProps={CandidateType} />
          </AppContextProvider>
          <CandidateModal
            openCandidateModal={openCandidateModal}
            setOpenCandidateModal={setOpenCandidateModal}
          ></CandidateModal>
        </>
      )}
      {location.pathname === '/Employees' && (
        <>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <Dropdown props={CandidateType} />
              <Dropdown props={CandidateRole} />
            </div>
            <div className='flex items-center pb-3 gap-2'>
              <Searchbox />
            </div>
          </div>
          <AppContextProvider>
            <CandidateTable TableProps={CandidateType} />
          </AppContextProvider>
          <CandidateModal
            openCandidateModal={openCandidateModal}
            setOpenCandidateModal={setOpenCandidateModal}
          ></CandidateModal>
        </>
      )}
      {location.pathname === '/Attendence' && (
        <>
          <div className='flex justify-between'>
            <div className='flex gap-1'>
              <Dropdown props={CandidateType} />
              <Dropdown props={CandidateRole} />
            </div>
            <div className='flex items-center pb-3 gap-2'>
              <Searchbox />
            </div>
          </div>
          <AppContextProvider>
            <CandidateTable TableProps={CandidateType} />
          </AppContextProvider>
          <CandidateModal
            openCandidateModal={openCandidateModal}
            setOpenCandidateModal={setOpenCandidateModal}
          ></CandidateModal>
        </>
      )}
      {location.pathname === '/Leaves' && (
        <div className='flex gap-2'>
          <div className='flex-grow bg-white rounded-lg shadow p-4 w-full'>
            <div className='flex flex-wrap justify-between items-center mb-4 gap-2'>
              <div className='flex gap-2'>
                <Dropdown props={CandidateType} />
                <Dropdown props={CandidateRole} />
              </div>
              <div className='flex gap-10 items-center'>
                <Searchbox />
                <button
                  type='button'
                  className='rounded-full bg-purple-600 px-6 py-2 text-sm font-semibold text-white shadow hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600'
                  onClick={() => setOpenCandidateModal(true)}
                >
                  Add Leave
                </button>
              </div>
            </div>

            <AppContextProvider>
              <CandidateTable TableProps={CandidateType} />
            </AppContextProvider>

            <CandidateModal
              openCandidateModal={openCandidateModal}
              setOpenCandidateModal={setOpenCandidateModal}
            />
          </div>

          <div className='w-[350px]'>
            <CalendarComponent />
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomPage
