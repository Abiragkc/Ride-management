import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import axios from"axios"

const Login = () => {
    const navigator=useNavigate()
    const [state,setstate]=useState(0)
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("") 

     const token=localStorage.getItem("jwt")
     const handlesubmit=()=>{
      console.log({email,password});
      axios.post("http://localhost:3000/login",{
        email:email,
        password:password
      }).then((res)=>{
        console.log(res);
        if(res.data.token){

          localStorage.setItem("jwt",res.data.token)
          if(res.data.role==="admin"){
            navigator("/admin")
          }else{
            navigator("/home")
            
          }
        }
        else{
          window.alert(res.data.msg)
        }
      }).catch((erro)=>{
        console.log(erro);
      })
     }
  return (
    <div className='l2'>
    



        <div className='l1'>
         <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} />
      </Form.Group>
    </Form>
    </div>
    <div>
    <Button onClick={handlesubmit} variant="primary">LOGIN</Button>
    <Button variant="outline-warning" onClick={()=>navigator("/register")}>GO REGISTER</Button>
    </div>
    </div>
  )
}

export default Login
