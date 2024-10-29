import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../contexts/AuthContext';


const Header = ({insideDashboard}) => {

  const {isAuthorized,setIsAuthorized}=useContext(tokenAuthContext)
  const navigate = useNavigate()
  const handleLogOut = ()=> {
    sessionStorage.clear()
    setIsAuthorized(false)
    navigate('/')
  }
  return (
    <>
    <Navbar style={{zIndex:'1'}} className="position-fixed w-100 top-0 border rounded">
        <Container>
          <Navbar.Brand>
            <Link to='/' className='fw-bolder' style={{textDecoration:'none'}}><i className="fa-brands fa-docker me-1" style={{color: "#ffffff"}}></i>Project Fair</Link>
          </Navbar.Brand>
          { insideDashboard &&
            <div className='ms-auto'>
            <button type="button" className='btn btn-link fw-bolder' onClick={handleLogOut}><i className="fa-solid fa-right-from-bracket"></i>Logout</button>
          </div>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
