import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { HiOutlineUsers } from "react-icons/hi";

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import SplitButton from 'react-bootstrap/SplitButton';
import { Button } from 'react-bootstrap';

function UsersInRoom({ teamId }) {
    const [usersInRoom, setUsersInRoom] = useState([]);
    const [showUsers, setShowUsers] = useState(false)

    console.log("usersinroomstate:", usersInRoom)

    useEffect(() => {
        const interval = setInterval(() => {

            fetch(`${process.env.REACT_APP_SERVER}/usersinroom?room=${teamId}`)
                .then(res => res.json())
                .then(data => {
                    console.log("users", data)
                    if (data.clients) {
                        console.log(data.clients.sockets)
                        setUsersInRoom(Object.keys(data.clients.sockets))
                    }
                })


            return () => clearInterval(interval)



        }, 2000)


    }, [])
    return (
       
  <Button variant='primary' style={{ position: 'fixed', bottom: 0, right: 0}}>
    <>
                        <span className='mx-1'>
                        تعداد کاربران حاضر در اتاق : {usersInRoom.length}
                        </span>
                    <HiOutlineUsers/>
    </>

              </Button>
      



    )
}

export default UsersInRoom