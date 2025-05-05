import { useEffect, useState } from 'react'
import Dropdown from '../dropdown/Dropdown'
import { getCandidates } from '../api/candidate'
import { AttendanceRecord, Candidate } from './types/types'
import { useLocation } from 'react-router-dom'
import { getEmployees } from '../api/employees'
import { useAppContext } from '../context/AppContext'
import { LeaveRequest } from '../context/types/context.type'
import { BsFiletypeDocx } from 'react-icons/bs'
export default function CandidateTable ({
  TableProps
}: {
  TableProps: string[]
}) {
  const [candidates, setCandidates] = useState<Candidate[] | null>(null)
  const [status, setStatus] = useState<string>('present')
  const { postCandidate, postLeave } = useAppContext()
  const [leavesdetails, setLeavesDetails] = useState<LeaveRequest[] | null>(
    null
  )
  const [attendance, setAttendance] = useState<AttendanceRecord[] | null>(null)
  const location = useLocation()
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await getCandidates()
        if (response?.data) {
          setCandidates(response.data)
        }
      } catch (e) {
        console.log('error', e)
      }
    }
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees()
        if (response?.data) {
          setAttendance(response.data.data)
        }
      } catch (e) {
        console.log('error', e)
      }
    }
    const fetchLeaves = async () => {
      try {
        const response = await getEmployees()
        console.log('response from table :', response)
        if (response?.data) {
          setLeavesDetails(response.data.data)
        }
      } catch (e) {
        console.log('error', e)
      }
    }
    fetchLeaves()
    fetchEmployees()
    fetchCandidates()
  }, [postCandidate, postLeave])
  useEffect(() => {
    console.log('##', attendance)
    console.log('e342', leavesdetails)
  }, [leavesdetails, attendance])
  return (
    <div className='h-[73vh] rounded-lg bg-white shadow-sm ring-1 ring-black/5 overflow-hidden'>
      <div>
        <table className='min-w-full text-left text-sm border-separate border-spacing-0'>
          {(location.pathname == '/Candidate' ||
            location.pathname == '/Employees') && (
            <div className='overflow-x-auto w-full'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-purple-700 text-white text-sm'>
                  <tr>
                    <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                      Sr no.
                    </th>
                    <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                      Candidates Name
                    </th>
                    <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                      Email Address
                    </th>
                    <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                      Phone Number
                    </th>
                    <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                      Position
                    </th>
                    {location.pathname == '/Employees' ? (
                      <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                        Department
                      </th>
                    ) : (
                      <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                        Status
                      </th>
                    )}
                    {location.pathname == '/Employees' ? (
                      <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                        Date Of Joining
                      </th>
                    ) : (
                      <th className='px-4 py-2 text-left font-semibold whitespace-nowrap'>
                        Experience
                      </th>
                    )}
                  </tr>
                </thead>

                <tbody className='text-sm divide-y divide-gray-100'>
                  {candidates != null &&
                    candidates.length > 0 &&
                    candidates?.map((person, idx) => (
                      <tr key={idx} className='hover:bg-gray-50'>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {String(idx + 1).padStart(2, '0')}
                        </td>
                        <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap'>
                          {person.fullName}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {person.email}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {person.phoneNumber}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {person.position}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {location.pathname == '/Employees' ? (
                            <span>Intern</span>
                          ) : (
                            <Dropdown props={TableProps} />
                          )}
                        </td>
                        <td className='px-4 py-2 whitespace-nowrap'>
                          {location.pathname == '/Employees'
                            ? new Date().toLocaleString('en-IN', {
                                dateStyle: 'medium',
                                timeStyle: 'short'
                              })
                            : person.experience}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {location.pathname == '/Attendence' && (
            <>
              <thead className='bg-purple-700 text-white'>
                <tr>
                  <th className='px-4 py-1 font-semibold'>Profile</th>
                  <th className='px-4 py-1 font-semibold'>Employee Name</th>
                  <th className='px-4 py-1 font-semibold'>Position</th>
                  <th className='px-4 py-3 font-semibold'>Task</th>
                  <th className='px-4 py-3 font-semibold'>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance != null &&
                  attendance.length > 0 &&
                  attendance?.map((person, idx) => (
                    <tr key={idx} className='hover:bg-gray-50'>
                      <td className='px-4 py-3'>
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className='px-4 py-3 font-medium text-gray-900'>
                        {person.fullName}
                      </td>
                      <td className='px-4 py-3'>{person.position}</td>
                      <td className='px-4 py-3'>{person.task}</td>
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded ${
                            person.status === 'present'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {person.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                {}
              </tbody>
            </>
          )}
          {location.pathname == '/Leaves' && (
            <>
              <thead className='bg-purple-700 text-white'>
                <tr>
                  <th className='px-4 py-1 font-semibold'>Profile</th>
                  <th className='px-4 py-1 font-semibold'>Name</th>
                  <th className='px-4 py-1 font-semibold'>Date</th>
                  <th className='px-4 py-3 font-semibold'>Reason</th>
                  <th className='px-4 py-3 font-semibold'>Status</th>
                  <th className='px-4 py-3 font-semibold'>Docx</th>
                </tr>
              </thead>
              <tbody>
                {leavesdetails != null &&
                  leavesdetails.length > 0 &&
                  leavesdetails?.map((person, idx) => (
                    <tr key={idx} className='hover:bg-gray-50'>
                      <td className='px-4 py-3'>
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className='px-4 py-3 font-medium text-gray-900'>
                        {person.fullName}
                      </td>
                      <td className='px-4 py-3'>{person.date}</td>
                      <td className='px-4 py-3'>{person.reason}</td>
                      <td className='px-4 py-3'>
                        <select
                          value={status}
                          onChange={e => setStatus(e.target.value)}
                          className={`px-2 py-1 text-xs rounded focus:outline-none ${
                            status === 'accepted'
                              ? 'bg-green-100 text-green-800'
                              : status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          <option value='pending'>Pending</option>
                          <option value='accepted'>Accepted</option>
                          <option value='rejected'>Rejected</option>
                        </select>
                      </td>
                      <td className='px-4 py-3 text-right'>
                        <BsFiletypeDocx
                          onClick={() => console.log('hello')}
                        ></BsFiletypeDocx>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  )
}
