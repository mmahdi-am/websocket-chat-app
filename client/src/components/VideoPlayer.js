import ReactPlayer from "react-player";
import React, {  useRef } from "react";
import {Button} from "react-bootstrap";
function VideoPlayer({ userSocket,yourID,roomID,play,URL,setPlay,setURL }) {
  const player = useRef();
  function receivedURL(URL) {
    setURL(URL.body);
  }
  function sendUrl(e) {
    e.preventDefault();
    const URLObject = {
      body: URL,
      id: yourID,
      roomId: roomID,
    };
    userSocket.emit("send URL", URLObject);
  }
  function handleURLChange(e) {
    setURL(e.target.value);
  }
  function onPlayVideo() {
    const playObject = {
      play: true,
      id: yourID,
      roomId: roomID,
    };
    userSocket.emit("play", playObject);
  }
  function onPauseVideo() {
    const pauseObject = {
      play: false,
      id: yourID,
      roomId: roomID,
    };
    userSocket.emit("pause", pauseObject);
  }

  function sync() {
    console.log(player.current.getCurrentTime());

    userSocket.emit("sync", {
      roomId: roomID,
      goTo: player.current.getCurrentTime(),
    });
  }

  userSocket.on("play", (playObj) => {
    setPlay(playObj.play);
  });

  userSocket.on("pause", (pauseObj) => {
    setPlay(pauseObj.play);
  });
  userSocket.on("sync", (body) => {
    setPlay(false);
    player.current.seekTo(body.goTo, "seconds");
  });

  userSocket.on("URL", (URL) => {
    receivedURL(URL);
  });

  return (
    <>    
          <ReactPlayer        
           ref={player}
           width={"100%"}    
           style={{minHeight:"600px",maxHeight:'100%',}}
           controls
           url={URL}
           onPlay={onPlayVideo}
           onPause={onPauseVideo}
           playing={play}
           />    
          <Button onClick={sync} className="w-100" >
            همگام سازی
          </Button >    
    </>
  );
}
export default VideoPlayer;
