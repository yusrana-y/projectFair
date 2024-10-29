import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../assets/pf-1.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { homeProjectAPI } from '../services/allAPI'


const Home = () => {
  const [allHomeProjects,setAllHomeProjects] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getAllHomeProjeccts()
  },[])

  const getAllHomeProjeccts = async () => {
    try
    {
      const result = await homeProjectAPI()
      if(result.status==200)
      {
        setAllHomeProjects(result.data)        
      }
    }
    catch(err)
    {
      console.log(err);      
    }

    console.log(allHomeProjects);
    
  }

  const handleProject = () => {
    if(sessionStorage.getItem("token"))
    {
      navigate('/projects')
    }
    else
    {
      alert("Please login to get full access to our projects")
    }
  }
  
  return (
    <>
      {/* Hero Section */}
      <div style={{ minHeight: '100vh' }} className="d-flex justify-content-center align-items-center rounded shadow w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '80px' }}><i className="fa-brands fa-docker me-1" style={{ color: "#ffffff" }}></i>Project Fair</h1>
              <p style={{ textAlign: "justify" }}> One Stop Destination for all Software Development Projects. Where users can add and manage their projects, as well as access all projects available in our website... What are you waiting for! </p>
{           sessionStorage.getItem("token") ?   
 <Link to={'/dashboard'} className='btn btn-warning'>Manage your Projects</Link>
 :
 <Link to={'/login'} className='btn btn-warning'>Start To Explore</Link>

}            </div>
            <div className="col-lg-6">
              <img src={image} alt="" className='img-fluid' />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Projects */}
      <div className='my-5 text-center'>
        <h1 className="mb-5">Explore our Projects</h1>
        <marquee>
          <div className="d-flex">
           {
              allHomeProjects?.length>0 &&
              allHomeProjects?.map(projects=>(
               <div className="me-5">
              <ProjectCard displayData={projects}/>
            </div>))
           }
          </div>
        </marquee>
        <div className="btn btn-link mt-5" onClick={handleProject}>CLICK HERE TO VIEW MORE PROJECTS.....</div>
      </div>

      {/* Testimonials */}
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Testimonials</h1>
        <div className="d-flex justify-content-evenly align-items-center mt-3 w-100">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://tse2.mm.bing.net/th?id=OIP.AbGafkazjc_S1pZPh0B9cQHaIm&pid=Api&P=0&h=220" alt="" width={'60px'} height={'60px'} className='img-fluid rounded-circle'   />
                <span>Alex Mathew</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center align-items-center'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quaerat eos aliquid corrupti facilis beatae quae impedit doloremque odit quibusda.</p>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png" alt="" width={'60px'} height={'60px'} className='img-fluid rounded-circle'   />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center align-items-center'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quaerat eos aliquid corrupti facilis beatae quae impedit doloremque odit quibusdam</p>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
                <img src="https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Image-File.png" alt="" width={'60px'} height={'60px'} className='img-fluid rounded-circle'   />
                <span>Anuv Jain</span>
              </Card.Title>
              <Card.Text>
                <div className='d-flex justify-content-center align-items-center'>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                  <i className='fa-solid fa-star text-warning'></i>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam quaerat eos aliquid corrupti facilis beatae quae impedit doloremque odit quibusdam</p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  )
}

export default Home
