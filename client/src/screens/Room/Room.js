import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { AiFillSetting } from 'react-icons/ai'
import { AiFillCopy } from 'react-icons/ai'
import { AiFillHome } from 'react-icons/ai'
import { AiFillVideoCamera } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillPlusCircle } from 'react-icons/ai'
import Alert from 'react-bootstrap/Alert'
import { Button, Card, ButtonGroup, Badge } from 'react-bootstrap'


import { useSocketContext } from "../../contexts/SocketContext";

import "./room.css";

import VideoPlayer from "../../components/VideoPlayer";
import VideoCall from "../../components/VideoCall/VideoCall";
import ChatBoxComponent from "../../components/ChatBoxComponent/ChatBoxComponent";
import LeaveButton from "../../components/LeaveButton";
import TabPanel from "../../components/TabPannel";
import RoomCode from "../../components/RoomCode";
import SwitchColor from "../../components/SwitchColor";
import AppbarContainer from "../../components/Appbar";



import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PickUserNameModal from "../../components/ModalBootstrap";
import ToastBootstrap from "../../components/Toast";
import Footer from "../../components/Footer";
import NavRoom from "../../components/NavRoom";
import randomIntFromInterval from "../../utils/randomIntFromInterval";
import MainHeader from "../../components/MainHeader";
import PickFavModal from "../../components/PickFavModal";
import ScreenShare from "../../components/screenshare/ScreenShare";
import { usePeerContext } from "../../contexts/PeerContext";
import { usePeerScreenShareContext } from "../../contexts/PeerScreenShareContext";
import UsersInRoom from "../../components/UsersInRoom";
import Board from "../../components/Board";


const Room = () => {
  // states
  const [yourID, setYourID] = useState();
  const [roomID, setroomID] = useState();
  const [showPickFav, setShowPickFav] = useState(false);
  const [PickedFav, setPickedFav] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [snackBarState, setSnackBarState] = useState({ state: false, msg: "" });
  const [tabValue, setTabValue] = React.useState(0);
  const [suggestedVideos, setSuggestedVideos] = React.useState([]);
  const [play, setPlay] = useState(false);
  const [URL, setURL] = useState("");




  const [showUsernameModal, setShowUserNameModal] = useState(true)
  const [pickedUsername, setPickedUsername] = useState("")
  const [visibility, setVisibility] = useState({ videoCall: false, screenShare: true, videoPlayer: false, board: false })





  // get params & location
  const location = useLocation();
  let { teamId } = useParams();

  // use context
  const userSocket = useSocketContext();

  const { myPeer, myPeerId } = usePeerContext();
  const { myPeer: screenPeer, myPeerId: myScreenPeerId } = usePeerScreenShareContext();

  function receivedMessage(message) {
    setMessages((oldMsgs) => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      username: pickedUsername,
      body: message,
      id: yourID,
      roomId: roomID,
      videoCallpeerId: myPeerId,
      screenSharePeerId: myScreenPeerId
    };
    setMessage("");
    console.log("sendmessage")
    if (messageObject.body !== '') {

      userSocket.emit("send message", messageObject);
    }
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }


  function handleCloseSnackbar() {
    setSnackBarState({ state: false, msg: snackBarState.msg });
  }


  function makeScreenShareCmpVisible() {
    setVisibility((p) => ({ videoCall: false, screenShare: true, videoPlayer: false, board: false }));


  }
  function makeVideoCallCmpVisible() {
    setVisibility((p) => ({ videoCall: true, screenShare: false, videoPlayer: false, board: false }));
  }
  function makeVideoPlayerCmpVisible() {
    setVisibility((p) => ({ videoCall: false, screenShare: false, videoPlayer: true, board: false }));

  }
  function makeBoardCmpVisible() {
    setVisibility((p) => ({ videoCall: false, screenShare: false, videoPlayer: false, board: true }));

  }


  function getDownloadLinkAndPlay(video) {
    fetch(`${process.env.REACT_APP_SERVER}/getvideobyuid?uid=${video.uid}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setURL(data.video.file_link)
        const URLObject = {
          body: data.video.file_link,
          id: yourID,
          roomId: roomID,
        };

        userSocket.emit("send URL", URLObject);
      }).catch(e => {

        console.log(e)
      })

  }







  useEffect(() => {
    setroomID(teamId);


    userSocket.emit("request-id");
    userSocket.on("your id", (id) => {
      console.log("myid", id)
      setYourID(id);
    });

    userSocket.emit("joinRoom", { roomID: teamId });

    userSocket.on("message", (message) => {
      console.log("new message", message)
      receivedMessage(message);
    });


  }, [teamId, userSocket]);


  useEffect(() => {
    if (PickedFav) {

      fetch(`${process.env.REACT_APP_SERVER}/getcategoryvideosbyid?catid=${PickedFav.catId}`)
        .then(res => {

          return res.json()
        })
        .then(data => {
          console.log(data)
          setSuggestedVideos(data)
        }).catch(e => {
          console.log(e)
        })

    }


  }, [PickedFav])



  useEffect(() => {
    if (pickedUsername) {
      userSocket.emit("send message", {
        username: pickedUsername,
        body: `کاربر ${pickedUsername} به اتاق وارد شد`,
        id: yourID,
        roomId: roomID,
        videoCallpeerId: myPeerId,
        screenSharePeerId: myScreenPeerId
      });
    }

  }, [pickedUsername])
  return (
    <>


      <MainHeader pickedUsername={pickedUsername} />


      <div className="pallete-1">
        <div className=" py-3"></div>

        <Container    >

          <Row className="">



            <Col className="rounded shadow " xs={{ span: 12, order: 2 }} md={{ span: 12, order: 2 }}>

              {pickedUsername && (

                <Alert variant={"info"} className="" onClose={() => false} dismissible>
                  خوش آمدید  {pickedUsername}
                </Alert>

              )}


              <Alert variant={"primary"} className=""  >
                کد اختصاصی اتاق شما <span style={{ textDecorationLine: "underline", margin: '0 0.2rem' }}>{roomID} </span>است.  با اشتراک گذاری این کد با دوستان خود آن ها را به اتاق دعوت کنید .
              </Alert>


            </Col>
            <Col xs={{ span: 12, order: 1 }} md={{ span: 3, order: 1 }}>

            </Col>

          </Row>
        </Container>


        <Container   >


          <Row className="my-3">
            <ButtonGroup>
              <Button onClick={makeScreenShareCmpVisible} active={visibility.screenShare}>اشتراک صفحه نمایش</Button>
              <Button onClick={makeVideoCallCmpVisible} active={visibility.videoCall}>برقراری تماس تصویری</Button>
              <Button onClick={makeVideoPlayerCmpVisible} active={visibility.videoPlayer}>جستجوی ویدیو</Button>
              <Button onClick={makeBoardCmpVisible} active={visibility.board}>تخته مجازی</Button>
            </ButtonGroup>
          </Row>

          <Row className="mb-4">

            <Col lg={{ span: 4, order: 0 }} xs={{ order: 2 }} className="p-0 m-0 me-md-3 mb-3 mb-lg-0 mt-5 mt-lg-0">

              <ChatBoxComponent
                handleChange={handleChange}
                message={message}
                sendMessage={sendMessage}
                messages={messages}
                yourID={yourID}
              />



            </Col>

            <Col>
              <Row className="  justify-content-center" style={!visibility.videoPlayer ? { height: 0, overflow: 'hidden' } : { height: 'auto', overflow: 'visible' }} >
                <Col className="pallete-3  rounded shadow p-0 my-2" xs={{ span: 12, order: 1 }} >
                  <NavRoom userSocket={userSocket} yourID={yourID} roomID={roomID} URL={URL} setURL={setURL} />
                </Col>
                <Col className="pallete-3  rounded shadow p-0" xs={{ span: 12, order: 1 }} >
                  <VideoPlayer
                    userSocket={userSocket}
                    yourID={yourID}
                    roomID={roomID}
                    URL={URL}
                    setURL={setURL}
                    play={play}
                    setPlay={setPlay}
                  />






                </Col>

              </Row>




              <Row className=" justify-content-center " style={!visibility.screenShare ? { height: 0, overflow: 'hidden' } : { height: 'auto', overflow: 'visible' }}  >
                <Col className="pallete-3  rounded shadow p-0" xs={{ span: 12, order: 1 }} >
                  <ScreenShare />
                </Col>
              </Row>


              <Row className="  justify-content-center " style={!visibility.videoCall ? { height: 0, overflow: 'hidden' } : { height: 'auto', overflow: 'visible' }}  >
                <Col className="pallete-3  rounded shadow p-0" xs={{ span: 12, order: 1 }} >
                  <VideoCall />
                </Col>
              </Row>



              <Row className="justify-content-center " style={!visibility.board ? { height: 0, overflow: 'hidden' } : { height: 'auto', overflow: 'visible' }}  >
                <Col className="pallete-3  rounded shadow p-0" xs={{ span: 12, order: 1 }} >
                  <Board
                    userSocket={userSocket}
                    yourID={yourID}
                    roomID={roomID} />
                </Col>
              </Row>



            </Col>














          </Row>










          {/* ویدیو های پیشنهادی */}
          <Row className="pallete-3 rounded  ">
            <Col className="pallete-3 p-2 rounded shadow" >

              <div className="d-flex justify-content-between align-items-start">

                <h3 className="text-start   m-4 ms-2  " style={{ borderBottom: "1px solid gray", paddingBottom: "10px", color: 'black' }}>ویدیوهای پیشنهادی</h3>
                <Badge bg="primary" className=" m-4 me-2" role="button" onClick={() => setShowPickFav(true)}>تغییر دسته ویدیو های پیشنهادی</Badge>

              </div>



              <Row >

                {suggestedVideos.categoryvideos && suggestedVideos.categoryvideos.slice(0, 8).map(video => {
                  return (

                    <Col key={video.small_poster} xs={6} lg={3} className="mb-5" >

                      <Card className="pallete-1 text-light  shadow h-100" >
                        <Card.Img variant="top" src={video.small_poster} style={{ height: '100px' }} />
                        <Card.Body>
                          <Card.Title className="h6">{video.title}</Card.Title>
                        </Card.Body>
                        <Card.Footer>
                          <Button className="w-100 pallete-2" variant="dark" onClick={() => { getDownloadLinkAndPlay(video); makeVideoPlayerCmpVisible() }}>پخش ویدیو</Button>
                        </Card.Footer>
                      </Card>
                    </Col>
                  )
                })}

              </Row>










            </Col>
          </Row>




        </Container>










        <PickUserNameModal
          show={showUsernameModal}
          setShowUsernameModal={setShowUserNameModal}
          pickedUsername={pickedUsername}
          setPickedUsername={setPickedUsername}
          onHide={() => { }} />


        <PickFavModal
          show={showPickFav}
          setShowPickFav={setShowPickFav}
          PickedFav={PickedFav}
          setPickedFav={setPickedFav}
          onHide={() => { setShowPickFav(false) }} />


        <div className=" py-5"></div>
      </div>


      <Footer />



      <UsersInRoom teamId={teamId} />


    </>
  );
};

export default Room;
