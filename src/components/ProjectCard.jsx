import React from 'react'
import { Card } from 'react-bootstrap'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import serverURL from '../services/serverURL';


const ProjectCard = ({displayData}) => {
  // console.log(displayData);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card className='shadow btn' onClick={handleShow}>
        <Card.Img height={'200px'} variant="top" src={`${serverURL}/uploads/${displayData?.projectImg}`} />
        <Card.Body>

          <Card.Title>
            {displayData?.title}
          </Card.Title>
        </Card.Body>
      </Card>

      <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <img className='img-fluid' src={`${serverURL}/uploads/${displayData?.projectImg}`} alt="" />
            </div>
            <div className="col-lg-6">
              <h3>{displayData?.title}</h3>
              <h6><span>Languages used:</span><span>{displayData?.language}</span></h6>
              <p style={{textAlign:'justify'}}> <span>Project Overview:</span> {displayData?.overview} </p>
            </div>
            <div className='float-start'>
            <a href="https://react-bootstrap.github.io/docs/components/modal/" target='_blank' className='btn btn-secondary'><i className="fa-solid fa-link"></i></a>
            <a href="https://github.com/" target='_blank' className='btn btn-secondary ms-2'><i className="fa-brands fa-github"></i></a>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default ProjectCard
