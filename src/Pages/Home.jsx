jiimport React,{useState} from 'react';
import { Container, Row,Col, Card, Button, Stack,Image } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import './Home.css'

const Home = () => {
  return (
    <>
      <Container fluid className="my-5">

        <Row className='bg-light shadow-md'>
          {/* <Stack direction="horizontal" gap={2}> */}
          <Col className=' d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 custom-card border border-0' >
              {/* <Card.Img variant="top" style={{ width: '10rem',height:'10rem' }} className='img-fluid' src="./images/auto Profile image.jpg" /> */}
              <Card.Body className='d-flex flex-column justify-content-center'>
                <Image src='./images/auto Profile image.jpg' className='img-fluid' />
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5' 
                >Auto Profile</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '15rem' }} className='my-5 custom-card border border-0'>
              <Card.Img variant="top" style={{  objectFit:'cover' }} src="./images/Rule Profiling image.png" />
              <Card.Body className=' d-flex flex-column justify-content-center'>
              {/* <Image src='./images/Rule Profiling image.png' className='img-fluid' style={{ width: '10rem',height:'10rem' }}/> */}
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>Rule Profile</Button>
              </Card.Body>
            </Card>

          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 custom-card border border-0' >
              <Card.Img variant="top" style={{ width: '100%',height:'100%',objectFit:'cover' }} src="./images/ml profile image.jpg" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>ML Profile</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 custom-card border border-0' >
              <Card.Img variant="top" style={{ width: '100%',height:'100%',objectFit:'cover' }} src="./images/DQ Stats Profiling image.png" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>DQ Stats Profiling</Button>
              </Card.Body>
            </Card>
          </Col>
          {/* </Stack> */}
        </Row>

        <Row className=' bg-light shadow-md'>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem',height:'15rem' }} className=' bg-danger my-5 border border-0 custom-card'>
              <Card.Img variant="top" style={{}} src="./images/DQ Reports image.png" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className=''>DQ Reports</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 border border-0 custom-card'>
              <Card.Img variant="top" style={{ width: '100%',height:'100%',objectFit:'cover' }} src="./images/DQ Metrics API Subscription image.png" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>DQ Metrics API Subscription</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 shadow-lg border border-0 custom-card'>
              <Card.Img variant="top" style={{ width: '100%',height:'100%',objectFit:'cover' }} src="./images/DQ Knowledge Articles image.png" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>DQ Knowledge Articles</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col className='d-flex justify-content-center'>
            <Card style={{ width: '18rem' }} className='my-5 shadow-lg border border-0 custom-card'>
              <Card.Img variant="top" style={{ width: '100%',height:'100%',objectFit:'cover' }} src="./images/User Onboarding image.png" />
              <Card.Body className=' d-flex justify-content-center'>
                <Button variant="danger" as={Link} to='/autoprofile' className='mx-5'>User Onboarding</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;


import React, { useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  useEffect(() => {
    // Fetch cookie
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith('yourCookieName='))
      .split('=')[1];

    // Decode the cookie value
    const decodedCookieValue = decodeURIComponent(cookieValue);

    // Send decoded cookie to backend
    axios.post('/api/send_decoded_cookie', { decodedCookie: decodedCookieValue })
      .then(response => {
        console.log('Decoded cookie sent successfully');
      })
      .catch(error => {
        console.error('Error sending decoded cookie:', error);
      });
  }, []);

  return (
    <div>
      <p>Sending decoded cookie to backend...</p>
    </div>
  );
}

export default MyComponent;


import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    // Fetch the am-auth-jwt cookie
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find(cookie => cookie.startsWith('am-auth-jwt='));

    if (jwtCookie) {
      // Decode the cookie value
      const jwtValue = jwtCookie.split('=')[1];
      const decodedJwtToken = decodeURIComponent(jwtValue);
      // Set the decoded JWT token in state
      setJwtToken(decodedJwtToken);
    }
  }, []);

  return (
    <div>
      <p>Decoded JWT Token: {jwtToken}</p>
    </div>
  );
}

export default MyComponent;