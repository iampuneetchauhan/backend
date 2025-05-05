export interface LeaveRequest {
  fullName: string
  designation: string
  reason: string
  file: string
  date: string
}
export interface contextTypes {
  postCandidate: boolean
  setPostCandidate: React.Dispatch<React.SetStateAction<boolean>>
  postLeave: boolean
  setPostLeave: React.Dispatch<React.SetStateAction<boolean>>
}
