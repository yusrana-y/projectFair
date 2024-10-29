import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { allProjectsAPI } from '../services/allAPI'


const Projects = () => {

  const [searchKey,setSearchKey] = useState("")

  const [allProjects,setAllProjects] = useState([])
  console.log(allProjects);

  useEffect(()=>{
    getAllProjects()
  },[searchKey])
  
  const getAllProjects = async()=>{
  
    const token = sessionStorage.getItem("token")
    if(token)
    {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }

      //api call
      try
      {
        const result = await allProjectsAPI(searchKey,reqHeader)
        if(result.status==200)
        {
          setAllProjects(result.data)
        }
        else
        {
          console.log(result.response.data);
          
        }
      }
      catch(err)
      {
        console.log(err);
        
      }
    }
  }
  return (
    <>
      <Header/>
      <div style={{marginTop:'150px'}} className="container-fluid">
      <div className="d-flex justify-content-between">
        <h1>All Projects</h1>
        <input type="text" placeholder='Search Projects by Language used' className='form-control w-25' onChange={e=>setSearchKey(e.target.value)}/>
      </div>
      <Row className='mt-3'>
        {allProjects?.length>0 ?
          allProjects?.map(project=>(
            <Col className='mb-3' sm={12} md={6} lg={4}>
            <ProjectCard displayData={project}/>
            </Col>
          ))
          :
          <div>No Projects found</div>
          }
        </Row>
      </div>
    </>
  )
}

export default Projects
