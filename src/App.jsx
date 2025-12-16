
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import CustomRouter  from './routes/CustomRouter'

function App() {
  

  return (
  <div>
    <BrowserRouter>
    <CustomRouter/>
    </BrowserRouter>
  </div>
  )
}

export default App
