import React, { useEffect, useRef, useState } from 'react'
import TextField from "@mui/material/TextField";
import Button from "react-bootstrap/Button";
import { usePeerScreenShareContext } from '../../contexts/PeerScreenShareContext';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ModalStyle } from '../../screens/Room/room-styled-components';
import Counter from '../Counter';
import { SlScreenDesktop } from "react-icons/sl";
import './screenshare.css'



function ScreenShare({ setSnackBarState }) {



    const [FriendPeerId, setFriendPeerId] = React.useState("");
    const [openModal, setOpenModal] = React.useState(false);
    const [showVideoContainer, setShowVideoContainer] = useState(true);



    // ref

    const screenRefReceiver = useRef();


    const { myPeer, myPeerId } = usePeerScreenShareContext();


    // modal handler
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);





    function callUser() {
        console.log(FriendPeerId);
        if (FriendPeerId === null) {
            console.log({ state: true, msg: " Friend Id can not be empty" });
            return;
        }

        navigator.mediaDevices
            .getDisplayMedia({ audio: true, video: { mediaSource: "screen" } })
            .then((stream) => {
                var call = myPeer.call(FriendPeerId, stream);
                
                call.on("stream", (stream) => {
                    playStream(stream);
                });





                playStream(stream);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function playStream(stream, role) {
        setShowVideoContainer(true);
        screenRefReceiver.current.srcObject = stream;

    }


    function handleCopyUserId(userId) {
        navigator.clipboard.writeText(userId);
        console.log({ state: true, msg: " User Id was copied" });
    }

    useEffect(() => {


        myPeer.on("call", function (call) {
            console.log("someone is calling");


            call.answer();

            call.on("stream", (stream) => {

                playStream(stream);

            });

        });





    }, [myPeer])

    return (
        <>
            {showVideoContainer && (
                <>
                    <div id="screenShareContainer">


                        <video
                            autoPlay

                            ref={screenRefReceiver}
                            style={{
                                width: "100%",
                                objectFit: 'cover',
                                height: "600px",


                            }}
                        ></video>
                    </div>


                </>
            )}

            <div className='chatInputContainer '>
                <input id="inputvideoid" type="text" className="" value={FriendPeerId}
                    onChange={(e) => setFriendPeerId(e.target.value)} placeholder='شناسه شخص مورد نظر را وارد کنید' />
                <button onClick={callUser} ><SlScreenDesktop  /></button>
            </div>


            <Button
                variant="primary"
                onClick={() => handleCopyUserId(myPeerId)}
                className="w-100 rounded-0 m-0"
            >
                <span style={{ fontSize: '14px', height: "100%" }}>

                    {myPeerId ? `id : ${myPeerId} ` : "در حال ساخت شناسه ..."}
                </span>
            </Button>





        </>
    )
}

export default ScreenShare