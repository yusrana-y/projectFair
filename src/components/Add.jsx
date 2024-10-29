import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import gUpload from '../assets/galleryUplad.png'
import { addProjectAPI } from '../services/allAPI';
import { addResponseContext } from '../contexts/ContextShare';

const Add = () => {

  const {addResponse,setAddResponse}=useContext(addResponseContext)
  const [imgWarningDisplay, setImgWarningDisplay] = useState(true) //conditional render the text upload only
  const [preview, setPreview] = useState(gUpload)
  const [projectData, setProjectData] = useState({
    title: "", language: "", overview: "", github: "", website: "", projectImg: ""
  })
  // console.log(projectData);

  useEffect(() => {
    if (projectData.projectImg.type == "image/png" || projectData.projectImg.type == "image/jpg" || projectData.projectImg.type == "image/jpeg") {
      setImgWarningDisplay(false)
      setPreview(URL.createObjectURL(projectData.projectImg))
    }
    else {
      setImgWarningDisplay(true)
      setPreview(gUpload)
      setProjectData({ ...projectData, projectImg: "" })
    }
  }, [projectData.projectImg])
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectData({ title: "", language: "", overview: "", github: "", website: "", projectImg: "" })
  }
  const handleShow = () => setShow(true);


  const handleSaveProject = async () => {
    const { title, language, overview, github, website, projectImg } = projectData
    if (title && language && overview && github && website && projectImg) {
      //api call to post data 
      const reqBody = new FormData() //reqBody is converted to form data as it contains file(image)
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("overview", overview)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("projectImg", projectImg)

      const token = sessionStorage.getItem("token")
      console.log(token);
      
      if (token) {
        console.log("API CAlled");
        
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        //api call - post request
        try {
          const result = await addProjectAPI(reqBody,reqHeader)
          // console.log(result)
          if (result.status == 200) {
            handleClose()
            // alert("Project Added successfully.")
            //share result via context
            setAddResponse(result)
          }
          else {
            alert(result.response.data)
          }

        }
        catch (err) {
          console.log(err);

        }

      }
    }
    else {
      alert("please fill the form completely.")
    }
  }


  return (
    <>
      <button className='btn btn-primary' onClick={handleShow}><i className='fa-solid fa-plus'> New Project</i></button>

      <Modal size='lg' show={show} onHide={handleClose} centered backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
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
          <Button variant="primary" onClick={handleSaveProject}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Add
