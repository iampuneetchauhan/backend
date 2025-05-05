import { createContext, ReactNode, useContext, useState } from 'react'
import { contextTypes} from './types/context.type'

const AppContext = createContext<contextTypes | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
const [postCandidate,setPostCandidate]=useState<boolean>(false)
const [postLeave, setPostLeave] = useState<boolean>(false)

  return (
    <AppContext.Provider value={{postCandidate,postLeave,setPostCandidate,setPostLeave}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider')
  }
  return context
}
