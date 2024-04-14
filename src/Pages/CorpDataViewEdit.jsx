import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb } from 'react-bootstrap';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import { GridLoader } from "react-spinners";
import { TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton,TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import './CorpData.css'


const CorpDataViewEdit = () => {

  const [formData, setFormData] = useState({
    db_name: '',
    table_name: '',
  });
  const [submitToggle, setSubmitToggle] = useState(false)
  const [editingRow, setEditingRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [dataNotFound, setDataNotFound] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = async (index, row) => {
    console.log(`Saving edited data for row ${index}`, row);
    setEditingRow(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('http://tdcldizcva002.ebiz.verizon.com:8000/onecorp/ViewEditOneCorpMtd/', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {

        setLoading(false);
        console.log(response);
        if (response.data.length === 0) {
          setSubmitToggle(false)
          setDataNotFound("No such combination or files exist")
          setTableData([])
        }
        else if (response.data.error) {
          throw new Error(response.data.error)
        }
        else {
          setDataNotFound("")
          setTableData(response.data)
          setSubmitToggle(true)
        }

      })
      .catch(error => {
        setLoading(false);
        console.error('Error in fetching details:', error);
        alert('Error in fetching details:', error)
      });
  };

  const resetHandler = () => {
    setFormData(prevState => ({
      ...prevState,
      db_name: '',
      table_name: ''
    }))
  }

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  return (<>
    <Container fluid>

      <Container fluid className="my-2 pt-3">
        <Breadcrumb>
          <Breadcrumb.Item active>Rule Profile</Breadcrumb.Item>
          <Breadcrumb.Item active><span className='fw-bold'>OneCorp View or Edit Metadata</span></Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid className='mx-8 px-8 mb-2' style={{ display: (submitToggle === false) ? "block" : "none" }}>
        <Row className="justify-content-center align-items-center my-xl-1">
          <Col xl={5}>
            <div className="px-5 py-2 rounded my-2">
              <h2 className="mb-2 text-center">ONECORP View/Edit</h2>
              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-2" controlId="ControlInput1">
                  <Form.Label>DB Name</Form.Label>
                  <Form.Control type="text" placeholder="Database" name="db_name" value={formData.db_name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-2" controlId="ControlInput2">
                  <Form.Label>Table Name</Form.Label>
                  <Form.Control type="text" placeholder="Table" className="file-input" name="table_name" value={formData.table_name} onChange={handleChange} />
                </Form.Group>

                <div className="d-flex justify-content-center mb-2">
                  <Button variant="dark" onClick={resetHandler} className='mx-2'>
                    Reset
                  </Button>

                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className='' style={{ display: (submitToggle === true) ? "block" : "none" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-left align-items-left">
            <Col xs={2}>
              <TextField
                id="outlined-required"
                label="Database"
                name="db_name" value={formData.db_name} onChange={handleChange}
                className=''
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={1}>
              <TextField
                id="outlined-required"
                label="Table Name"
                name="table_name" value={formData.table_name} onChange={handleChange}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={1}>
              <Button variant="dark" type="submit" className='btn-lg'>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>

    {tableData.length > 0 ? (
      <>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {tableData[0] &&
                    Object.keys(tableData[0]).map((key) => (
                      <TableCell key={key} style={{ minWidth: '100%' }}>{key}</TableCell>
                    ))}
                  <TableCell key="action">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                      {Object.values(tableData).map((value, valueIndex) => (
                        <TableCell key={valueIndex} editable={editingRow === index}>
                          {editingRow === index ? (
                            <TextField
                              defaultValue={value}
                              onBlur={(e) => {
                                const updatedRow = { ...row };
                                updatedRow[Object.keys(row)[valueIndex]] = e.target.value;
                              }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      ))}
                      <TableCell key={`action-${index}`}>
                        {editingRow === index ? (<>
                          <LoadingButton loading={false} loadingPosition="start" startIcon={<SaveIcon />} onClick={() => handleSave(index, row)}>
                            Save
                          </LoadingButton>
                        </>
                        ) : (
                          <IconButton onClick={() => handleEdit(index)}>
                            <EditIcon /> Edit
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        
      </>) : <div className="d-flex justify-content-center m-2 blink">
      <h5>{dataNotFound}</h5>
    </div>}


    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <Container className="loading-overlay">
        <GridLoader color="#ff0000" loading={loading} cssOverride={override} size={20} aria-label="Loading Spinner" data-testid='loader' />
      </Container>
    </Backdrop>

  </>);
};

export default CorpDataViewEdit;
