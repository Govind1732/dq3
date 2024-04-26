import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb, Modal, Alert } from "react-bootstrap";
import axios from "axios";
import { GridLoader } from "react-spinners";
// import './AutoProfile.css'
import Backdrop from '@mui/material/Backdrop';
// import CircularProgress from '@mui/material/CircularProgress';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const AutoProfile = ({ onData }) => {
  const [file1, setFile1] = useState(null);
  const [loading, setLoading] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState('')
  // const [selectedStep, setSelectedStep] = useState(4)

  // Send selectedStep to UserOnboarding(data from child to parent)
  // const sendDataToUser = () => {
  //   onData(selectedStep)
  // }
  const handleClose = () => {
    setShow(false);
    resetHandler()
    // setSelectedStep(5)
    // sendDataToUser()
  }


  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     if (unsavedChanges) {
  //       event.preventDefault();
  //       event.returnValue = '';
  //     }
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [unsavedChanges]);



  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(e)
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile1(selectedFile);
      // setUnsavedChanges(true);
    } else {
      alert('Please select a csv file');
    }
  };

  const handleUpload = () => {
    if (!file1) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    setLoading(true);
    formData.append('file1', file1);

    axios.post('https://tdcldizcva002.ebiz.verizon.com:8001/mle/MLESelfServe/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setUnsavedChanges(false);
        setModalTitle(response.data.status)
        setModalBody(response.data.message)
        setShow(true)
      })
      .catch(error => {
        console.error('Error uploading file: ', error);
        setLoading(false);
        setModalTitle(error.status)
        setModalBody(error.message)
        setShow(true)

      });
  };

  const resetHandler = (e) => {
    setFile1(null);
    e.target.files=null
    console.log(e)
    // console.log(file1)
    // const fileInput = document.getElementById('formFile');
    // if (fileInput) {
    //   fileInput.value = ''
    // }
    // setUnsavedChanges(false);
  };

  return (
    <>

      <Container fluid className=''>
        <Container fluid className="my-2 pt-3">
          <Breadcrumb>
            <Breadcrumb.Item active>Profiling Services</Breadcrumb.Item>
            <Breadcrumb.Item active>Auto Profile</Breadcrumb.Item>
            <Breadcrumb.Item active><span className='fw-bold'>Submit Request</span></Breadcrumb.Item>

          </Breadcrumb>
        </Container>

        <Container fluid className="mx-8 px-8 mb-2">
          <Row className="justify-content-center align-items-center my-5">
            <Col xl={5}>
              <div className="px-5 py-3">
                <h2 className="mb-4 text-center" style={{color:'#EE0000'}}>Auto Profile</h2>


                <h6>dqaas_auto_prfl_mtd_&lt;proj_name&gt;.csv</h6>
                
                <Form.Group controlId="file1" className="my-3">

                  <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
                </Form.Group>

                <a href="/dataQuality/assets/dqaas_auto_prfl_mtd_proj_name.csv" download className="text-decoration-none text-danger">
                  Download sample Template(CSV)
                </a>
                <div className="d-flex justify-content-center my-3">
                  <Button variant="outline-dark" onClick={resetHandler} className='mx-2' style={{borderRadius:'25px'}}>
                    Reset
                  </Button>
                  <Button variant="dark" type="submit" onClick={handleUpload} className="mx-2" style={{borderRadius:'25px'}}>
                    Submit
                  </Button>
                </div>


              </div>

            </Col>
          </Row>
        </Container>
        <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-90w" variant="success" as={Alert}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        {/* <CircularProgress color="inherit" /> */}
        <Container className="loading-overlay">
          <GridLoader color="#ff0000" loading={loading} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid='loader' />
        </Container>
      </Backdrop>
    </>
  );
};

export default AutoProfile;
