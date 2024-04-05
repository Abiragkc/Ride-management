import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from'axios'

const Register = () => {
    const navigator=useNavigate()
    const [state,setstate]=useState(0)
    const [name,setname]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [phone,setphone]=useState("")
    const [rideimage,setrideimage]=useState([])






    
    const handlesubmit=()=>{
      console.log({name,email,password,phone,rideimage});
      const formData= new FormData()

      formData.append("name",name)
      formData.append("email",email)
      formData.append("phone",phone)
      formData.append("password",password)
      formData.append("file",rideimage)

      axios.post("http://localhost:3000/register",formData
     
     ).then((res)=>{
      console.log(res);
      navigator("/login")
     }).catch((erro)=>{
      console.log(erro);
     })
    }
  return (
    <div className='r2'>
     <div className='r1'>
     <Form>
     <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="name" placeholder="name"onChange={(e)=>setname(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>phone</Form.Label>
        <Form.Control type="number" placeholder="number" onChange={(e)=>setphone(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
        <Form.Group className="mb-3" controlId="formGroupPassword">
             <Form.Label>Profile</Form.Label>
             <Form.Control type="file" placeholder="" onChange={(r)=>setrideimage(r.target.files[0])} />
            </Form.Group>
      </Form.Group>
    </Form>
     </div>
     <div>
     <Button onClick={()=>handlesubmit("/login")} variant="outline-info">REGISITER</Button>{' '}
     <Button variant="outline-primary" onClick={()=>navigator("/login")} >GO LOGIN </Button>
     </div>
    </div>
  )
}

export default Register
