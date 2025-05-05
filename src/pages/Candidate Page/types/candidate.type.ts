export interface RegisterCandidateProps {
  fullName: string;
  email: string;
  phoneNumber: string;
  position: string;
  experience: string;
  resume:File | null;
  declarationAccepted: boolean;
}
