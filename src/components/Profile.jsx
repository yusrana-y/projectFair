import { useEffect, useState } from 'react'
import React from 'react'
import { Collapse } from 'react-bootstrap'
import profileImg from '../assets/profile-upload.jpg'
import serverURL from '../services/serverURL'
import { editProfileAPI } from '../services/allAPI'

const Profile = () => {
  const [preview, setPreview] = useState("")
  const [existingUserImg, setExistingUserImg] = useState("")
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    github: '',
    linkedin: '',
    profilePic: ''
  })

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      const existingUserDetails = JSON.parse(sessionStorage.getItem("user"))
      setUserData({ ...userData, username: existingUserDetails.username, email: existingUserDetails.email, password: existingUserDetails.password, github: existingUserDetails.github, linkedin: existingUserDetails.linkedin })
      setExistingUserImg(existingUserDetails.profilePic)

    }
  }, [open])

  useEffect(() => {
    if (userData.profilePic) {
      setPreview(URL.createObjectURL(userData.profilePic))
    }
    else {
      setPreview("")
    }
  }, [userData.profilePic])

  const handleUpdateProfile = async () => {
    const { username, email, password, github, linkedin, profilePic } = userData
    if (github && linkedin) {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profilePic", profilePic) : reqBody.append("profilePic", existingUserImg)

      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }

        //call api
        try {
          const result = await editProfileAPI(reqBody, reqHeader)
          if(result.status==200)
          {
            sessionStorage.setItem("user",JSON.stringify(result.data))
            setOpen(!open)
          }
          else
          {
            console.log(result)
          }
        }
        catch (err) {
          console.log(err);

        }

      }
      else {
        alert("ff")
      }
    }
    else {
      alert("please fill the form completely")
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-evenly">
        <h2 className='text-warning'>Profile</h2>
        <button type="button" className='btn fw-bolder text-warning' onClick={() => setOpen(!open)}><i className='fa-solid fa-chevron-down'></i></button>
      </div>

      <Collapse in={open}>
        <div className="row align-items-center justify-content-center shadow rounded p-2 m-1" id="example-collapse-text">
          <label className='text-center mb-2'>
            <input type="file" style={{ display: 'none' }} onChange={e => setUserData({ ...userData, profilePic: e.target.files[0] })} />
            {existingUserImg == "" ?
              <img src={preview ? preview : profileImg} alt="" width={'220px'} height={'220px'} className=' rounded-circle' />
              :
              <img src={preview ? preview : `${serverURL}/uploads/${existingUserImg}`} alt="" width={'220px'} height={'220px'} className=' rounded-circle' />

            }          </label>
          <div className="mb-2">
            <input onChange={e => setUserData({ ...userData, github: e.target.value })} type="text" value={userData.github} className='form-control' placeholder='Github Link' />
          </div>
          <div className="mb-2">
            <input onChange={e => setUserData({ ...userData, linkedin: e.target.value })} type="text" value={userData.linkedin} className='form-control' placeholder='Linkedin Link' />
          </div>
          <div className="d-grid">
            <button type="button" className='bg-warning btn w-100' onClick={handleUpdateProfile}>Update Profile</button>
          </div>

        </div>
      </Collapse>

    </>
  )
}

export default Profile
