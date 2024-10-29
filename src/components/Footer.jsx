import React from 'react'

const Footer = () => {
  return (
    <div style={{height:'300px'}} className='container mt-5 w-100'>
      <div className='d-lg-flex justify-content-center'>
        <div className="intro w-25">
          <div style={{color:'white'}} className='fs-5'><i className="fa-brands fa-docker me-1" style={{color: "#ffffff"}}></i>Project Fair</div>
          <p style={{textAlign:'left'}}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas quod aspernatur nam qui a, totam ab vitae facilis, ipsum quae consequatur blanditiis expedita ad ipsa. Ipsum magnam optio molestiae delectus! </p>
          <span>Version 2.2.3</span>
        </div>

        <div className="links w-25 ms-5" >
          <div style={{color:'white'}} className='fs-5 mb-2'>Links</div>
          <p>Home</p>
          <p>Login</p>
          <p>Register</p>
        </div>

        <div className="guide w-25">
        <div style={{color:'white'}} className='fs-5 mb-2'>Guides</div>
          <p>React</p>
          <p>React Bootstrap</p>
          <p>React Router</p>
        </div>

        <div className="contact w-25">
        <div style={{color:'white'}} className='fs-5 mb-2'>Contact Us</div>
         <form className='d-flex gap-2'>
          <input type="text" className='form-control' placeholder='Enter your email here'/>
          <button type="button" className='btn btn-primary'><i className="fa-solid fa-arrow-right"></i></button>
         </form>
         <div className="contact-icons d-flex gap-5 mt-4">
         <i className="fa-brands fa-twitter fs-5"></i>
         <i className="fa-brands fa-instagram fs-5"></i>
         <i className="fa-brands fa-linkedin fs-5"></i>
         <i className="fa-brands fa-whatsapp fs-5"></i>
         <i class="fa-brands fa-facebook fs-5"></i>
         </div>
        </div>

      </div>
      <div className='text-center'>Copyright <i class="fa-regular fa-copyright"></i> May 2024, Project Fair. Built with React.</div>
    </div>
  )
}

export default Footer
