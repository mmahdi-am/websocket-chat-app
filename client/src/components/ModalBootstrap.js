import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Form from 'react-bootstrap/Form'
function PickUserNameModal({show,onHide,pickedUserName,setPickedUsername,setShowUsernameModal}) {
    const [userName,setUserName] = useState()
    const formUsernameHandler = (e) =>{
        e.preventDefault()
        setShowUsernameModal((p)=>!p)
        onHide()
    }
  return (
    <Modal  
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          نام کاربری خود را انتخاب کنید 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={formUsernameHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>نام کاربری</Form.Label>
        <Form.Control value={userName}  onChange={(e)=>setUserName(e.target.value)} type="text" placeholder="نام کاربری" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={()=>setPickedUsername(userName)}>
        تایید
      </Button>
    </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PickUserNameModal