import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Approutes from './routes/routes'
import { AppContextProvider } from './components/context/AppContext'

function App () {
  return (
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Approutes></Approutes>
        </AppContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
