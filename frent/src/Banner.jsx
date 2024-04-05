import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Banner() {
    const navigator=useNavigate()
     
    const [state,setstate]=useState(0)

    const token =localStorage.getItem("jwt")
     const handlesubmit=()=>{
      console.log({email,password});

      axios.post("http://localhost:3000/login",{
        email,
        password
      }).then((res)=>{
        localStorage.setItem("jwt",res.data)
        navigator("/")
        console.log(res);
      }).catch((erro)=>{
        console.log(erro);
      })
     }
     const handlogout=()=>{
      localStorage.removeItem("jwt")
      window.location.reload()
     }

  return (
    <div>
      <div>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">RIDE MANGAMENT</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            
            <Button><Link id="link"  to="/home">Home</Link></Button>
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
      { token?

       <Button  variant="outline-danger" onClick={handlogout}> LOGOUT</Button>
       :
      <Button onClick={()=>navigator("/login")} variant="outline-secondary">Login</Button>
      }
       <Button onClick={()=>navigator("/profile")}>PROFILE</Button>

       </Navbar>
      </div>
    </div>
  )
}

export default Banner
