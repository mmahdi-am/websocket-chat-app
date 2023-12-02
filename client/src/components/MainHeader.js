import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import logo from '../logo.png'
import {FaUserAlt} from 'react-icons/fa'
function MainHeader({pickedUsername}) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
    <Container>     
      <Navbar.Brand >
        <img src={logo} style={{ width: '40px', height: '40px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        <Link to={"/"} style={{textDecoration:'none',color:'white'}} className='mx-2 my-2 my-md-0' >
          صفحه اصلی
        </Link>
        <Link to={"/rooms"} style={{textDecoration:'none',color:'white'}} className='mx-2 my-2 my-md-0' >
          لیست اتاق ها
        </Link>
          <Link to={"/contact-us"} style={{textDecoration:'none',color:'white'}} className='mx-2 my-2 my-md-0'>
          ارتباط با ما
          </Link>
        </Nav>
      </Navbar.Collapse>
      {pickedUsername && (<div className='d-none d-md-block'><span style={{color:"white",margin:"0 0.5rem"}}>{pickedUsername}</span><FaUserAlt style={{color:'white'}}/></div>)}  
    </Container>
  </Navbar>
  )
}

export default MainHeader