import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import r1 from "../assets/ride1.jpeg"
import r2 from "../assets/ride2.webp"
import r3 from "../assets/ride3.webp"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

const Adminpanal = () => {


  const [state, setstate] = useState(0)
  const [techn, settech] = useState([])
  const [ride, setride] = useState([])
  const [issues, setissues] = useState([])

  const [ridename, setridename] = useState("")
  const [Disprisition, setdisprisition] = useState("")
  const [rideimage, setrideimage] = useState("")

  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [phone, setphone] = useState("")
  const [password, setpassword] = useState("")

  const getTechnicians = () => {
    axios.post("http://localhost:3000/get_user").then(res => {
      console.log(res.data);
      settech(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getTechnicians()
  }, [])

  const getRides = () => {
    axios.post("http://localhost:3000/get-rides").then(res => {
      console.log(res.data);
      setride(res.data)
    }).catch(err => {
      console.log(err);
    })
  }

  useEffect(() => {
    getRides()
  }, [])


  const addRide = () => {

    console.log({ ridename, Disprisition, rideimage });

    const formData = new FormData()

    formData.append("ridename", ridename)
    formData.append("disprisition", Disprisition)
    formData.append("file", rideimage)



    axios.post("http://localhost:3000/addrides", formData).then((res) => {
      console.log(res);

      getRides()

    }).catch(err => {
      console.log(err);
    })
  }

  const handlesubmit = () => {
    console.log({ username, email, phone, password });

    axios.post("http://localhost:3000/user", {
      username,
      email,
      phone,
      password
    }).then((res) => {
      console.log(res);
      getRides()

    }).catch((erro) => {
      console.log(erro);
    })
  }

  const handleDelete = (ride_id) => {

    console.log(ride_id);

    axios.post(`http://localhost:3000/delete/${ride_id}`).then((res) => {
      console.log(res.data);
      getRides()

    }).catch(err => {
      console.log(err);
    })

  }
  const techDelete = (teches_id) => {
    console.log(teches_id);
    axios.post(`http://localhost:3000/deletetech/${teches_id}`).then((res) => {
      console.log(res.data);
      getTechnicians()

    }).catch(err => {
      console.log(err);
    })
  }

  const handleRoleChange = async (userid, role) => {

    console.log({ userid, role });

    try {
      await axios.post(`http://localhost:3000/role_update/${userid}/${role}`)
      alert("role changed")
      getTechnicians()
    } catch (erro) {
      console.erro(erro);
      alert("failed to change role")
    }
  }
  const [ShowModal,setShowModal]=useState(false)

  const handleRoleButtonClick=()=>{
    setShowModal(true)
  }
  const handleCloseModal=()=>{
    setShowModal(false)
  }

  const handleRoleSelection=(role)=>{
    console.log("selected role",role);
    setShowModal(false)
  }

const getissues=()=>{
  axios.post("http://localhost:3000/get-issues").then(res=>{
    console.log(res.data);
    setissues(res.data)
  }).catch(err=>{
    console.log(err);
  })
}

useEffect(()=>{
  getissues()
},[])

const  deleteissues=(issues_id)=>{
console.log(issues_id);

axios.post(`http://localhost:3000/issuesdelete/${issues_id}`).then((res)=>{
  console.log(res.data);
  getissues()
}).catch(err=>{
  console.log(err);
})
}

const verifyissues=(issues_id)=>{
console.log(issues_id);

 axios.post(`http://localhost:3000/verify/${issues_id}`).then((res)=>{
  console.log(res.data);
  getissues()
 }).catch(err=>{
  console.log(err);
 })
}


  return (
    <div>
      <div className='a1'>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link onClick={() => setstate(0)} >USER</Nav.Link>
          <Nav.Link onClick={() => setstate(1)} >TECHNICAN</Nav.Link>
          <Nav.Link onClick={() => setstate(2)} >RIDES</Nav.Link>
          <Nav.Link onClick={() => setstate(3)} >ISSUES</Nav.Link>
        </Nav>
        {state == 0 ?
          <div className="right_user">
        

            {techn.map((item, index) =>

              <div key={index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={"http://localhost:3000/" + item.profile_image} />
                  <Card.Body>
                    <Card.Title>{item.username}</Card.Title>
                    <Card.Text>
                      {item.role}
                      <br />  
                      {item.email}
                      <br />
                      {item.phone}
                      <br />
                      {item.address}
                    </Card.Text>
                    
                    <Button variant="outline-warning" onClick={handleRoleButtonClick}>Role</Button>
                    <Modal show={ShowModal} onHide={handleCloseModal}>
                   
                                                            <Modal.Header closeButton>
                                                                <Modal.Title>Select Role</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body>
                                                                <Button id="userdel" variant="outline-info" onClick={() => handleRoleChange(item._id, "user")}>User</Button>
                                                                <Button id="userdel" variant="outline-warning" onClick={() => handleRoleChange(item._id, "technician")}>Technician</Button>
                                                                <Button id="userdel" variant="outline-success" onClick={() => handleRoleChange(item._id, "admin")}>Admin</Button>

                                                            </Modal.Body>
                                              </Modal>
                    <Button variant="outline-danger" onClick={handlesubmit}>delete</Button>
                  </Card.Body>
                </Card>
              </div>
            )}

          </div>
          : state == 1 ?
            <div className="right_technician">
              

              {techn.map((item, index) =>
                item.role=="technician"&&

                <div key={index}>

                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={"http://localhost:3000/" + item.profile_image} />
                    <Card.Body>
                      <Card.Title>{item.username}</Card.Title>
                      <Card.Text>
                       {item.role}
                       <br />
                       {item.email}
                       <br />
                       {item.phone}
                      </Card.Text>
                  
                      <Button variant="outline-danger" onClick={() => techDelete(item._id)} >delete</Button>
                    </Card.Body>
                  </Card>
                </div>
              )}


            </div>
            : state == 2 ?
              <div className="right_ride">
               

                <div className='f1'>
                  <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>RIDE NAME</Form.Label>
                      <Form.Control type="text" placeholder="" onChange={(r) => setridename(r.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Disprisition</Form.Label>
                      <Form.Control as="textarea" rows={3} onChange={(r) => setdisprisition(r.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                      <Form.Label>RIDE IMAGE</Form.Label>
                      <Form.Control type="file" placeholder="" onChange={(r) => setrideimage(r.target.files[0])} />
                    </Form.Group>
                  </Form>
                </div>
                <div>
                  <Button className='f2' variant="warning" onClick={addRide} >ADD RIDE</Button>{' '}
                </div>



               
                <div className="rides_all">

                  {ride.map((singleride, index) =>

                     <div key={index} className='f3' >
                      <Button variant="danger" onClick={() => handleDelete(singleride._id)} >Delete</Button>
                      <h5>{singleride.ridename}</h5>
                      <img className='p1' src={`http://localhost:3000/${singleride.rideimage}`} alt="" />
                      <h5>{singleride.disprisition}</h5>
                    </div>
                  )}
                </div>
                
              </div> :
              <div className="issues">
              
                {issues.map((item,index)=>
               <div key={index}>
               <Card style={{ width: '18rem' }}>
               {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
               <Card.Title>{item.title}</Card.Title> 
                <Card.Text>
                 {item.ridesname}
                 <br />
                 {item.description}
                 <br />
                 {item.date}
                  </Card.Text>
                 <Button variant="outline-primary"onClick={()=>verifyissues(item._id)} >{item.verify?"Verified":"Not Verified"}</Button>
                 <Button variant="outline-danger" onClick={()=>deleteissues(item._id)}>DELETE</Button>
                </Card.Body>
               </Card>
             
               </div>
                 )}
                 
              </div>


        }
      </div>

    </div>
  )
}

export default Adminpanal
