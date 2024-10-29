import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gUpload from '../assets/galleryUplad.png'
import serverURL from '../services/serverURL';
import { editResponseContext } from '../contexts/ContextShare';

const Edit = ({project}) => {
  const {editResponse, setEditResponse} = useContext(editResponseContext)

  const [projectData, setProjectData] = useState({
   id:project?._id, title: project?.title, language: project?.language, overview:project?.overview, github:project?.github, website: project?.website, projectImg: ""
  })

  console.log(projectData);
  

  const [preview,setPreview] = useState("")
  const [imgWarningDisplay,setImgWarningDisplay] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false);
    setProjectData({
      id:project?._id, title: project?.title, language: project?.language, overview:project?.overview, github:project?.github, website: project?.website, projectImg: ""
     })
  }
  const handleShow = () => {setShow(true);
    setProjectData({
      id:project?._id, title: project?.title, language: project?.language, overview:project?.overview, github:project?.github, website: project?.website, projectImg: ""
     })
  }

  useEffect(() => {
    if (projectData.projectImg.type == "image/png" || projectData.projectImg.type == "image/jpg" || projectData.projectImg.type == "image/jpeg") {
      setImgWarningDisplay(false)
      setPreview(URL.createObjectURL(projectData.projectImg))
    }
    else {
      setImgWarningDisplay(true)
      setPreview("")
      setProjectData({ ...projectData, projectImg: "" })
    }
  }, [projectData.projectImg])

  return (
    <>
    <button className='btn' onClick={handleShow}><i className="fa-solid fa-pen-to-square"></i></button>

    <Modal size='lg' show={show} onHide={handleClose} centered  backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="row">
          <div className="col-lg-4">
              <label>
                <input type="file" name="" id="" style={{ display: 'none' }} onChange={e => { setProjectData({ ...projectData, projectImg: e.target.files[0] }) }} />
                <img height={'200px'} src={preview} alt="" className='img-fluid' />
              </label>
              {imgWarningDisplay &&
                <div className='text-danger'>Upload only jpeg,jpg,png format only*</div>
              }            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" placeholder='Project Title' value={project?.title} className='form-control' onChange={e => { setProjectData({ ...projectData, title: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Languages used in Projects' value={project?.language}  className='form-control' onChange={e => { setProjectData({ ...projectData, language: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Project Github Link' value={project?.github}  className='form-control' onChange={e => { setProjectData({ ...projectData, github: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Project Website Link' value={project?.website}  className='form-control' onChange={e => { setProjectData({ ...projectData, website: e.target.value }) }} />
              </div>
            </div>
            <div className="mb-2">
              <input type="text" placeholder='Project Overview' value={project?.overview} className='form-control' onChange={e => { setProjectData({ ...projectData, overview: e.target.value }) }} />
            </div>
          </div> */}
                    <div className="row">
            <div className="col-lg-4">
              <label>
                <input type="file" name="" id="" style={{ display: 'none' }} onChange={e => { setProjectData({ ...projectData, projectImg: e.target.files[0] }) }} />
                <img height={'200px'} src={preview?preview:`${serverURL}/uploads/${project?.projectImg}`} alt="" className='img-fluid' />
              </label>
              {imgWarningDisplay &&
                <div className='text-danger'>Upload only jpeg,jpg,png format only*</div>
              }            </div>
            <div className="col-lg-8">
              <div className="mb-2">
                <input type="text" placeholder='Project Title' value={projectData?.title}  className='form-control' onChange={e => { setProjectData({ ...projectData, title: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Languages used in Projects'  value={projectData?.language} className='form-control' onChange={e => { setProjectData({ ...projectData, language: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Project Github Link'  value={projectData?.guthub} className='form-control' onChange={e => { setProjectData({ ...projectData, github: e.target.value }) }} />
              </div>
              <div className="mb-2">
                <input type="text" placeholder='Project Website Link' value={projectData?.website}  className='form-control' onChange={e => { setProjectData({ ...projectData, website: e.target.value }) }} />
              </div>
            </div>
            <div className="mb-2">
              <input type="text" placeholder='Project Overview' value={projectData?.overview} className='form-control' onChange={e => { setProjectData({ ...projectData, overview: e.target.value }) }} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" >
            Update
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit
