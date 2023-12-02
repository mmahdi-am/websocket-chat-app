import Toast from 'react-bootstrap/Toast';
import React from 'react';
import ToastContainer from 'react-bootstrap/ToastContainer';
function ToastBootstrap({name,show}) {
  return (
    <ToastContainer position='top-start'>

    <Toast show={show}  >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">ورود موفقیت آمیر</strong>
        <small>لحظاتی پیش</small>
      </Toast.Header>
      <Toast.Body>خوش آمدید {name}</Toast.Body>
    </Toast>
    </ToastContainer>
  );
}

export default ToastBootstrap;