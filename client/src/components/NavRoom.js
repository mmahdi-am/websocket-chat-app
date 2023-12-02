import React, { useState,useEffect } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { BsFillPlayCircleFill } from 'react-icons/bs'
import ShareButton from './ShareButton.js/ShareButton'
import { FaUserCircle } from "react-icons/fa";
import { Button } from 'react-bootstrap'



function NavRoom({ setURL, yourID, roomID, userSocket }) {
  const [searchResultsIsReady, setSearchResultsIsReady] = useState(false)
  const [searchVideoTitle, setSearchVideoTitle] = useState('')
  const [videos, setVideos] = useState([])
  console.log(videos)
  function getDownloadLinkAndPlay(video) {
    setVideos([])
    setSearchResultsIsReady(false)
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


  const searchTitleHandler = (e) => {
    if(e.target.value === ""){
      setSearchResultsIsReady(false)
    }
    setSearchVideoTitle(e.target.value)

  }
  const searchVideo = (title) => {
    fetch(`${process.env.REACT_APP_SERVER}/searchvideo?title=${encodeURIComponent(title)}`, {
     
    })
 
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setSearchResultsIsReady(true)
        setVideos(data.videobysearch)
      })
      .catch(e => {
        console.log(e)
      })

    
  }



  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      console.log(searchVideoTitle)
      searchVideo(searchVideoTitle)
    }, 1500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchVideoTitle])

 

  return (
    <div className='  shadow'>
      <Form className="d-flex ">
        <InputGroup>
          <InputGroup.Text className="bg-white  position-relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.5 3a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM1 9.5a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0z"
              />
              <path
                fillrzfule="evenodd"
                d="M16.853 16.854a.5.5 0 0 0 .707 0l3.793-3.793a.5.5 0 0 0 0-.707l-3.793-3.793a.5.5 0 0 0-.707.707L19.293 12H10.5a.5.5 0 0 0 0 1h8.793l-2.646 2.646a.5.5 0 0 0 0 .707z"
              />
            </svg>
          </InputGroup.Text>
          <FormControl type="search" className="" onChange={searchTitleHandler} placeholder="جستجوی ویدیو .... " />
          {searchResultsIsReady && (
            <div style={{ backgroundColor: '#ffffff', width: '100%', height: 'max-content', position: 'absolute', top: '100%', left: 0, zIndex: 2, cursor: "pointer" }}>
              {videos !== null ? videos.map(video => {
                return (

                  <div  key={(Math.random() + 1).toString(36).substring(7)} style={{ borderBottom: '1px solid black' }} onClick={() => { getDownloadLinkAndPlay(video) }} className='p-3 d-flex justify-content-between aparat-result-single-item'>
                  <span>{video.title}</span>
                  <BsFillPlayCircleFill />
                </div>
                  )
              }) : ''}
            </div>
          )}
        </InputGroup>
      </Form>
   </div>
  )
}
export default NavRoom 

