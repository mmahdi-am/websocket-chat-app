import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PickRoomNumberModal({ showRoomModal, setShowRoomModal, joinRoom, roomId, setRoomId }) {
  const handleClose = () => setShowRoomModal(false);
  const handleShow = () => setShowRoomModal(true);
  return (
    <>
      <Modal
        show={showRoomModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>شناسه اتاق را وارد کنید</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={(e) => joinRoom(e, roomId)}>
            <label htmlFor="room-id">شناسه اتاق : </label>

            <input type="text" className='w-100 my-3 border p-2' id='room-id' placeholder='شناسه اتاق را وارد کنید ....' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
            <Button variant="primary" type='submit' onClick={handleClose} >
              ورود
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            بستن
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )

}

export default PickRoomNumberModal