import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import pro from"../assets/profileimg.webp"

const Profile = () => {

  const [name,setname]=useState("")
  const [email,setemail]=useState("")
  const [phone,setphone]=useState("")
  const [role,setrole]=useState("")
  const [profile_image,setprofile_image]=useState("")

  const navigator=useNavigate()

  const getUser=()=>{
    const token=localStorage.getItem("jwt")
    if(token){
      axios.post("http://localhost:3000/start",{
        token:token
      }).then((res)=>{
        console.log(res.data);
        setname(res.data.username)
        setemail(res.data.email)
        setphone(res.data.phone)
        setrole(res.data.role)
        setprofile_image(res.data.profile_image)
      }).catch((erro)=>{
        console.log(erro);
      })
    }else{
      navigator("/login")
    }
  }

  useEffect(()=>{
    getUser()
  },[])


  return (
    <div className='p2'>

      <div>
        <img className='p1' src={`http://localhost:3000/${profile_image}`} alt="" />
      </div>
      
      <div className='p3'>
        <h3>INFORMATION</h3>
        <hr />

        username:{name}
        <br />
        role:{role}
        <br />
        email:{email}
        <br />
        phone:{phone}
      </div>
      
      
    </div>
  )
}

export default Profile
