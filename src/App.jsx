import './App.css'
import { Navigate, Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Auth from './pages/Auth'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContext'


function App() {
  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Navigate to='/login'/>}></Route>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Navigate to='/login'/>}></Route>
      <Route path='/login' element={<Auth/>}></Route>
      <Route path='/register' element={<Auth insideRegister={true}/>}></Route>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
