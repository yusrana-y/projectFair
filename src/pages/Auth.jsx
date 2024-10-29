import React, { useContext, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import {Form,Spinner} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import image from '../assets/register.png'
import { loginAPI, registerAPI } from '../services/allAPI';
import { tokenAuthContext } from '../contexts/AuthContext';


const Auth = ({ insideRegister }) => {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  const [isLoading,setIsLoading]  = useState(false)

  const navigate = useNavigate()
  const [userData,setUserData] = useState({
    username:'',
    email:'',
    password:''
  })

  console.log(userData);

  const handleRegister = async (e) => {
    e.preventDefault()
    if(userData.username && userData.email && userData.password)
    {
      try
      {
        const result = await registerAPI(userData)
        console.log(result);
        if(result.status==200)
        {
          alert(`Welcome ${result?.data?.username}.. Please login to explore our website`)
          setUserData({username:"",email:"",password:""})
          navigate('/login')
        }
        else
        {
          if(result.response.status==406)
          {
            alert(result.response.data)
            setUserData({username:"",email:"",password:""})
          }
        }
      }
      catch(err)
      {
        console.log(err);        
      }
    }
    else
    {
      alert('please fill the form')
    }
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()
    if(userData.email && userData.password)
    {
      try
      {
        const result = await loginAPI(userData)
        console.log(result);
        if(result.status==200)
        {
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorized(true)
          setIsLoading(true)
          setTimeout(() => {
            setUserData({username:"",email:"",password:""})
            navigate('/')
            setIsLoading(false)
          }, 2000);
      
        }
        else{
          if(result.status==404)
            alert(result.response.data)
        }

      }
      catch(err)
      {
        console.log(err);
      }

    }
    else
    {
      alert("please fill the login form completely.")
    }
  }
  return (
    <div className='w-100 d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className="cotainer w-75">
        <div className="card shadow p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img src={image} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className='fw-bolder mt-2'><i className='fa-brands fa-docker'></i>Project Fair</h1>
              <div className="fw-bolder my-2">
                Sign {insideRegister ? "Up" : "In"} to your Account
              </div>

              <form action="">
            { insideRegister &&  <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
              </FloatingLabel> }

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control type="email" placeholder="name@example.com" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} />
              </FloatingLabel>

{/* register or login button */}
              {
                insideRegister?
                <div className="mt-3">
                  <div onClick={handleRegister} className="btn btn-danger mb-2">Register</div>
                  <p>Already have an account? <Link to='/login'>Click here</Link></p>
                </div>
                :
                  
                <div className="mt-3">
                   <div className="btn btn-primary mb-2" onClick={handleLogin}>Login
                  { isLoading && <Spinner animation="border" variant="light" className='ms-1'/>}
                   </div>
                   <p>New User?  <Link to='/register'>Register here</Link></p>
                </div>
              }
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
