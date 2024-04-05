import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const TechncianReg = () => {
  return (
    <div className='tr2'>
      <div>
        <h3>TECHNICIAN REGISTER</h3>
      </div>
      <div className='tr1'>
      <>
      <FloatingLabel
        controlId="floatingInput"
        label="NAME"
        className="mb-3"
      >
        <Form.Control type="name" placeholder="name" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Email address"
      className="mb-3"
      >
        <Form.Control type="Email address" placeholder="name@exmaple" />
      </FloatingLabel>
    </>
    <>
      <FloatingLabel
        controlId="floatingInput"
        label="Phone number"
        className="mb-3"
      >
        <Form.Control type="number" placeholder="number" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Address"  className="mb-3">
        <Form.Control type="address" placeholder="address" />
      </FloatingLabel>
    </>
    <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type="password" placeholder="Password" />
      </FloatingLabel>
      </div>
    </div>
  )
}

export default TechncianReg
