import { useState } from 'react'
import './App.css'
import LoginPage from './LoginPage'
import Demo from './Demo'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext'
import Signup from './RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
    <BrowserRouter>
    <Demo></Demo>
    <Routes> 
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/register' element={<Signup/>}></Route>
    </Routes>
    </BrowserRouter>
    </UserContextProvider>
  )
}

export default App
