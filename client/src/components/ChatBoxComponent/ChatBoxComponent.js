import React from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NumbersIcon from "@mui/icons-material/Numbers";

import Badge from 'react-bootstrap/Badge';
import { IoMdSend } from 'react-icons/io'
import { IoMdPerson } from 'react-icons/io'

import './stylechat.css'

function ChatBoxComponent({ messages, yourID, sendMessage, handleChange, message }) {
  console.log(messages)
  return (
    <>
            <div className="card h-100 m-0 p-0">
              <div className="card-header">چت روم</div>
              <div className="card-body height3">
                <ul className="chat-list  overflow-auto"  >
                  {messages.map((message, index) => {
                    if (message.id === yourID) {
                      return (
                        <li className="out">
                          <div className="chat-img">
                            <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar1.png" />
                          </div>
                          <div className="chat-body">
                            <div className="chat-message">
                       
                              <h5>{message.username}</h5>


                              <p> {message.body}</p>
                            </div>
                            <Badge pill bg="info" onClick={() => {navigator.clipboard.writeText(message.videoCallpeerId)}} style={{cursor: "pointer"}}>
                            شناسه تماس تصویری  :                 
                            {message.videoCallpeerId}                       
                           </Badge>
                          <Badge pill bg="success" onClick={() => {navigator.clipboard.writeText(message.screenSharePeerId)}} style={{cursor: "pointer"}}>شناسه اشتراک صفحه :{message.screenSharePeerId}</Badge>
                          </div>
                        </li>


                      );
                    }
                    return (

                      <li className="in">
                        <div className="chat-img">
                          <img alt="Avtar" src="https://bootdey.com/img/Content/avatar/avatar6.png" />
                        </div>
                        <div className="chat-body">
                          <div className="chat-message">
                            <h5>{message.username}</h5>
                            <p>{message.body}</p>
                          </div>
                          <Badge pill bg="info" onClick={() => {navigator.clipboard.writeText(message.videoCallpeerId)}}  style={{cursor: "pointer"}}>
                            شناسه تماس تصویری  :                 
                            {message.videoCallpeerId}                       
                           </Badge>
                          <Badge pill bg="success" onClick={() => {navigator.clipboard.writeText(message.screenSharePeerId)}}  style={{cursor: "pointer"}}>شناسه اشتراک صفحه :{message.screenSharePeerId}</Badge>
                        </div>
                      </li>

                    );
                  })}
                 
                </ul>
              </div>
                <form onSubmit={sendMessage}>
              <div className='chatInputContainer'>
                <input type="text" className="" value={message} onChange={handleChange} placeholder='پیامی ارسال کنید...' />
                <button type='submit' ><IoMdSend style={{ transform: 'rotate(180deg)' }} /></button>
              </div>
                </form>
            </div>



    </>
  )
}

export default ChatBoxComponent