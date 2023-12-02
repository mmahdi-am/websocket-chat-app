import React, { useEffect ,useRef,useState} from 'react'
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import { usePeerContext } from '../../contexts/PeerContext';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ModalStyle } from '../../screens/Room/room-styled-components';
import Counter from '../Counter';
import  {IoIosVideocam}  from 'react-icons/io';
import './videocall.css'
import Person from './person.jpg'



function VideoCall() {
  const [FriendPeerId, setFriendPeerId] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [showVideoContainer, setShowVideoContainer] = useState(true);

    // ref
    const AudioAndVideoRefSender = useRef();
    const AudioAndVideoRefReceiver = useRef();
  

  const { myPeer, myPeerId } = usePeerContext();
  

    // modal handler
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);








  


  function callUser() {
    console.log(FriendPeerId);
    if (FriendPeerId === null) {
      
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        var call = myPeer.call(FriendPeerId, stream);
        call.on("stream", (stream) => {
          playStream(stream, "receiver");
        });
        
       
  

        
        playStream(stream, "sender");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function playStream(stream, role) {
    setShowVideoContainer(true);

    if (role === "sender") {
      AudioAndVideoRefSender.current.srcObject = stream;
    }
    if (role === "receiver") {
      AudioAndVideoRefReceiver.current.srcObject = stream;
    }
  }


  function handleCopyUserId(userId) {
    navigator.clipboard.writeText(userId);
    
  }

  useEffect(()=>{


    
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        myPeer.on("call", function (call) {
          console.log("someone is calling");

          handleOpenModal();
          call.answer(stream);

          playStream(stream, "sender");
          call.on("stream", (stream) => {
            playStream(stream, "receiver");
          });

        });

     
        
      })
      .catch((error) => {
        console.log(error);
      });

  },[myPeer])

  return (
    <>
          {showVideoContainer && (
        <>
          <div id="videoContainer">
            <video
              autoPlay
              
              ref={AudioAndVideoRefSender}
              style={{
                objectFit:'contain',
                borderRadius:'0',
                width: "100px !important",
                height:'100px',            
                position:"absolute",
                top:0,
                right:0
              }}
            ></video>

            <video
              autoPlay
             
              ref={AudioAndVideoRefReceiver}
              style={{
                width: "100%",
                objectFit:'cover',                           
                height:"500px"
              
                
              }}
            ></video>
          </div>


        </>
      )}

<div className='chatInputContainer '>
    <input id="inputvideoid" type="text" className="" value={FriendPeerId}
        onChange={(e) => setFriendPeerId(e.target.value)} placeholder='شناسه شخص مورد نظر را وارد کنید' />
    <button  onClick={callUser} ><IoIosVideocam style = {{transform: 'rotate(180deg)' }} /></button>
    </div>
   
        
          <Button
            variant="primary"
            onClick={() => handleCopyUserId(myPeerId)}
            className="w-100 rounded-0 m-0 "
          >
            <span style={{fontSize:'14px',height:"100%"}}>

            {myPeerId ?  `id : ${myPeerId} `  : "در حال ساخت شناسه ..."}
            </span>
          </Button>


        
     



  </>
  )
}

export default VideoCall