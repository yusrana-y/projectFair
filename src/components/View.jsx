import React, { useContext, useEffect, useState } from 'react'
import Add from './Add'
import Edit from './Edit'
import { deleteProjectAPI, userProjectsAPI } from '../services/allAPI'
import { addResponseContext, editResponseContext } from '../contexts/ContextShare'


const View = () => {

  const {editResponse, setEditResponse} = useContext(editResponseContext)
  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [userProject, setUserProject] = useState([])
  console.log(userProject);



  useEffect(() => {
    getUserProject()
  }, [addResponse,editResponse])

  const handleDeleteProject = async (pId)=> {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      //api call
      try
      {
        const result = await deleteProjectAPI(pId,reqHeader)
        if(result.status==200)
        {
          getUserProject()
        }
        else
        {
          console.log(result);
          
        }
      }
      catch(err)
      {
        console.log(err);
        
      }
  }}


  const getUserProject = async () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      //api call

      try {
        const result = await userProjectsAPI(reqHeader)
        // console.log(result);
        if (result.status == 200) {
          setUserProject(result.data)
        }
        else {
          console.log(result.response.data);

        }

      }
      catch (err) {
        console.log(err);

      }
    }
  }

  return (
    <>
      <div className="container">
        <div className='d-flex justify-content-between'>
          <h2 className='text-warning'>All Projects</h2>
          <Add />
        </div>
        <div className='row border rounded my-2 d-flex justify-content-between align-items-center'>
          {userProject?.length > 0 ?
          userProject?.map(project=>(
            <div className=''>
              <h3 className='p-1'>{project?.title}</h3>
              <div className='d-flex align-items-center'>
                <div><Edit project={project}/></div>
                <div><a href={project.github} target='_blank' className='btn'><i class="fa-brands fa-github"></i></a></div>
                <button className='btn' onClick={()=>handleDeleteProject(project?._id)}> <i class="fa-solid fa-trash" style={{ color: '#FFD43B' }}></i></button>
              </div>
            </div>
          ))
            
            :
            <div>You have not added any projects.</div>
          }
        </div>
      </div>

    </>
  )
}

export default View

// import React, { useContext, useEffect, useState } from 'react'
// import Add from './Add'
// import Edit from './Edit'
// import { deleteProjectAPI, userProjectsAPI } from '../services/allAPI'
// import { addResponseContext } from '../contexts/ContextShare'


// const View = () => {
//   const { addResponse, setAddResponse } = useContext(addResponseContext)
//   const [userProject, setUserProject] = useState([])

//   useEffect(() => {
//     getUserProjects()
//   }, [addResponse])

//   const getUserProjects = async () => {
//     const token = sessionStorage.getItem("token")
//     if (token) {
//       const reqHeader = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//       try {
//         const result = await userProjectsAPI(reqHeader)
//         console.log(result);
//         if (result.status == 200) {
//           setUserProject(result.data)
//         } else {
//           console.log(result);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }


//   const handleDeleteProject = async (pId) => {
//     const token = sessionStorage.getItem("token")
//     if (token) {
//       const reqHeader = {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`
//       }
//       try {
//         const result = await deleteProjectAPI(pId, reqHeader)
//         if (result.status == 200) {
//           getUserProject()
//         } else {
//           console.log(result);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }

//   return (
//     <>
//       <div className="d-flex justify-content-between mt-2">
//         <h2 className="text-warning">All Projects</h2>
//         <div> <Add /> </div>
//       </div>
//       <div className="mt-2">
//         {
//           userProject?.length > 0 ?

//             userProject?.map(project => (
//               <div key={project?._id} className="border rounded p-2 mb-3 d-flex justify-content-between">
//                 <h3>{project?.title}</h3>
//                 <div className='d-flex align-items-center'>
//                   <div> <Edit project={project} /> </div>
//                   <div className='btn'><a href={project?.github} target='_blank'> <i className="fa-brands fa-github"></i> </a></div>
//                   <button onClick={() => handleDeleteProject(project?._id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button>
//                 </div>
//               </div>
//             ))

//             :

//             <div className="fw-bolder text-warning">No Projects uploaded yet!!!</div>
//         }

//       </div>
//     </>
//   )
// }

// export default View