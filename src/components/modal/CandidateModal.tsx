'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from '@headlessui/react'
import { CandidateModalProps } from './types/modal.types'
import { useEffect, useState } from 'react'
import { RegisterCandidateProps } from '../../pages/Candidate Page/types/candidate.type'
import { RegisterCandidate } from '../api/candidate'
import { useLocation } from 'react-router-dom'
import { postleave } from '../api/leave'
import { useAppContext } from '../context/AppContext'

export default function CandidateModal ({
  openCandidateModal,
  setOpenCandidateModal
}: CandidateModalProps) {
  const location = useLocation()
  const { setPostCandidate, setPostLeave } = useAppContext()
  const [candidatePayload, setCandidatePayload] =
    useState<RegisterCandidateProps>({
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      experience: '',
      resume: null,
      declarationAccepted: false
    })

  const [leavePayload, setLeavePayload] = useState({
    fullName: '',
    designation: '',
    leaveDate: '',
    reason: '',
    documents: null as File | null
  })

  const CandidatePosition = [
    'Intern',
    'Full time',
    'Junior',
    'Senior',
    'Team Lead'
  ]

  const handleCandidateFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setCandidatePayload(prev => ({ ...prev, resume: file }))
    }
  }

  const handleLeaveFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    if (file) {
      setLeavePayload(prev => ({ ...prev, documents: file }))
    }
  }

  const handleAddCandidate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullName', candidatePayload.fullName)
    formData.append('email', candidatePayload.email)
    formData.append('phoneNumber', candidatePayload.phoneNumber)
    formData.append('position', candidatePayload.position)
    formData.append('experience', candidatePayload.experience)
    formData.append(
      'declarationAccepted',
      String(candidatePayload.declarationAccepted)
    )
    if (candidatePayload.resume) {
      formData.append('resume', candidatePayload.resume)
    }

    try {
      const response = await RegisterCandidate(formData)
      console.log(response)
      setOpenCandidateModal(false)
      setPostCandidate(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log('Leave Payload:', leavePayload)
  }, [leavePayload])

  const handleSaveLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('fullName', leavePayload.fullName)
    formData.append('designation', leavePayload.designation)
    formData.append('leaveDate', leavePayload.leaveDate)
    formData.append('reason', leavePayload.reason)
    if (leavePayload.documents) {
      formData.append('file', leavePayload.documents)
    }
    try {
      const response = await postleave(formData)
      if (response?.status == 200) {
        setOpenCandidateModal(false)
        setPostLeave(prev => !prev)
      }
      console.log('response is', response)
    } catch (e) {
      console.log('the error is :', e)
    }
  }

  useEffect(() => {
    console.log(leavePayload.documents)
  }, [leavePayload])
  return (
    <Dialog
      open={openCandidateModal}
      onClose={setOpenCandidateModal}
      className='relative z-10'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/40' />

      <div className='fixed inset-0 z-10 flex items-center justify-center p-4 overflow-y-auto'>
        <DialogPanel className='w-full max-w-4xl rounded-lg bg-white shadow-xl'>
          {location.pathname === '/Leaves' ? (
            <>
              {/* Leave Modal */}
              <div className='bg-purple-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between'>
                <DialogTitle className='text-lg font-semibold'>
                  Add New Leave
                </DialogTitle>
                <button
                  onClick={() => setOpenCandidateModal(false)}
                  className='text-white hover:text-gray-200'
                >
                  ✕
                </button>
              </div>

              <form className='px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input
                  type='text'
                  placeholder='Full Name*'
                  className='w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600'
                  onChange={e =>
                    setLeavePayload(prev => ({
                      ...prev,
                      fullName: e.target.value
                    }))
                  }
                />

                <input
                  type='text'
                  placeholder='Designation*'
                  className='w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600'
                  onChange={e =>
                    setLeavePayload(prev => ({
                      ...prev,
                      designation: e.target.value
                    }))
                  }
                />

                <div className='relative'>
                  <input
                    type='date'
                    placeholder='Leave Date*'
                    className='w-full rounded-md border border-purple-400 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600'
                    onChange={e =>
                      setLeavePayload(prev => ({
                        ...prev,
                        leaveDate: e.target.value
                      }))
                    }
                  />
                </div>

                <div className='relative'>
                  <input
                    type='file'
                    className='w-full rounded-md border border-purple-400 px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-600'
                    onChange={e => handleLeaveFileUpload(e)}
                  />
                  <span className='absolute inset-y-0 right-3 flex items-center pointer-events-none text-purple-600'>
                    ⬆️
                  </span>
                </div>

                <textarea
                  placeholder='Reason*'
                  rows={3}
                  className='sm:col-span-2 w-full rounded-md border border-purple-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none'
                  onChange={e =>
                    setLeavePayload(prev => ({
                      ...prev,
                      reason: e.target.value
                    }))
                  }
                />

                <div className='col-span-2 flex justify-center pt-2'>
                  <button
                    type='submit'
                    onClick={e => handleSaveLeave(e)}
                    className='rounded-md bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={
                      !leavePayload.fullName ||
                      !leavePayload.designation ||
                      !leavePayload.leaveDate ||
                      !leavePayload.reason
                    }
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          ) : (
            <>
              {/* Candidate Modal */}
              <div className='bg-purple-700 text-white px-6 py-4 rounded-t-lg'>
                <DialogTitle className='text-lg font-semibold'>
                  Add New Candidate
                </DialogTitle>
              </div>

              <form className='px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Full Name*
                  </label>
                  <input
                    type='text'
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    onChange={e =>
                      setCandidatePayload(prev => ({
                        ...prev,
                        fullName: e.target.value
                      }))
                    }
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email Address*
                  </label>
                  <input
                    type='email'
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    onChange={e =>
                      setCandidatePayload(prev => ({
                        ...prev,
                        email: e.target.value
                      }))
                    }
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Phone Number*
                  </label>
                  <input
                    type='tel'
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    onChange={e =>
                      setCandidatePayload(prev => ({
                        ...prev,
                        phoneNumber: e.target.value
                      }))
                    }
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Position*
                  </label>
                  <select
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    value={candidatePayload.position}
                    onChange={e =>
                      setCandidatePayload(prev => ({
                        ...prev,
                        position: e.target.value
                      }))
                    }
                  >
                    <option value='' disabled hidden>
                      Position
                    </option>
                    {CandidatePosition.map(pos => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Experience*
                  </label>
                  <input
                    type='number'
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    defaultValue='0'
                    onChange={e =>
                      setCandidatePayload(prev => ({
                        ...prev,
                        experience: e.target.value
                      }))
                    }
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Resume*
                  </label>
                  <input
                    type='file'
                    className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2'
                    onChange={e => handleCandidateFileUpload(e)}
                  />
                </div>

                <div className='col-span-2'>
                  <label className='inline-flex items-center'>
                    <input
                      type='checkbox'
                      className='form-checkbox text-purple-600'
                      onChange={e =>
                        setCandidatePayload(prev => ({
                          ...prev,
                          declarationAccepted: e.target.checked
                        }))
                      }
                    />
                    <span className='ml-2 text-sm text-gray-700'>
                      I hereby declare that the above information is true to the
                      best of my knowledge and belief
                    </span>
                  </label>
                </div>

                <div className='col-span-2 flex justify-center pt-2'>
                  <button
                    type='submit'
                    onClick={e => handleAddCandidate(e)}
                    className='rounded-md bg-purple-700 hover:bg-purple-600 text-white font-semibold px-6 py-2'
                  >
                    Save
                  </button>
                </div>
              </form>
            </>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
