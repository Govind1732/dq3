import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import { GridLoader } from "react-spinners";
import { TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import './AutoProfile.css'
import { FormControl, FormLabel, Autocomplete, Textarea } from '@mui/joy';


const AutoViewEdit = () => {

  const [formData, setFormData] = useState({
    db_name: '',
    table_name: '',
  });
  const [submitToggle, setSubmitToggle] = useState(false)
  const [editingRow, setEditingRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [dataNotFound, setDataNotFound] = useState('')
  const [dbOptions, setDbOptions] = useState([])
  const [tableOptions, setTableOptions] = useState([])
  const [alert, setAlert] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  useEffect(() => {
    const fetchDBName = async (url) => {
      // fetch(url).then(response=>response.json()).then(data=>console.log(data)).catch(err=>console.log(err))
      try {
        const response = await axios.get(url)
        setDbOptions(response.data.distinct_db)
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchDBName('http://tdcldizcva002.ebiz.verizon.com:8000/mle/DropdownDbAutoMLEMtd/')
  }, [])

  useEffect(() => {
    // const fetchTableName = (url) => {
    //   axios.post(url, formData.db_name, {
    //     headers: {
    //       'content-Type': 'application/json'
    //     }
    //   }).then(response => {
    //     console.log(response.data.distinct_tbl)
    //   }).catch(err => { console.error('Error in fetching Table options', err) })
    // }
    // fetchTableName('http://tdcldizcva002.ebiz.verizon.com:8000/mle/DropdownDbAutoMLEMtd/')

    axios.post('http://tdcldizcva002.ebiz.verizon.com:8000/mle/DropdownDbAutoMLEMtd/', { DB_NAME: formData.db_name }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setTableOptions(response.data.distinct_tbl)

      })
      .catch(error => {
        console.error('Error in fetching details:', error);
      });
  }, [formData.db_name])

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = async (index, row) => {
    console.log(`Saving edited data for row ${index}`, row);
    setEditingRow(null);
    setAlert(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('https://tdcldizcva002.ebiz.verizon.com:8001/mle/ViewEditAutoMLEMtd/', formData, {
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
    setDataNotFound("")
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
          <Breadcrumb.Item active>Profiling</Breadcrumb.Item>
          <Breadcrumb.Item active>Auto Profile</Breadcrumb.Item>
          <Breadcrumb.Item active><span className='fw-bold'>View or Edit Metadata</span></Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid className='mx-8 px-8 mb-2' style={{ display: (submitToggle === false) ? "block" : "none" }}>
        <Row className="d-flex justify-content-center align-items-center text-align-center my-xl-1">
          <Col xl={5}>
            <div className="px-5 py-2 rounded my-2">
              <h2 className="mb-2 text-center" style={{ color: '#EE0000' }}>AutoProfile Metadata</h2>
              <Form onSubmit={handleSubmit}>

                {/* <Form.Group className="mb-2" controlId="ControlInput1">
                  <Form.Label>DB Name</Form.Label>
                  <Form.Control type="text" placeholder="Database" name="db_name" value={formData.db_name} onChange={handleChange} />
                </Form.Group> */}

                <FormControl sx={{ margin: 2 }}>
                  <FormLabel className='fw-bold'>DB Name</FormLabel>
                  <Autocomplete
                    placeholder="Select your Option"
                    options={[...dbOptions, '']}
                    autoHighlight
                    name="db_name"
                    value={formData.db_name}
                    onSelect={handleChange}
                  />
                </FormControl>

                {/* <Form.Group className="mb-2" controlId="ControlInput1">
                  <Form.Label>DB Name</Form.Label>
                  <Form.Select value={formData.db_name} name='db_name' onChange={handleChange} required>
                    <option value='' disabled>Select Environment</option>
                    {dbOptions.map(option => {
                      return (
                        <option>{option}</option>
                      )
                    })}
                  </Form.Select>
                </Form.Group> */}

                <FormControl sx={{ margin: 2 }}>
                  <FormLabel className='fw-bold'>Table Name</FormLabel>
                  <Autocomplete
                    placeholder="Select your Option"
                    options={['',...tableOptions]}
                    autoHighlight
                    name="table_name"
                    value={formData.table_name}
                    onSelect={handleChange}
                  />
                </FormControl>



                {/* <FormControl sx={{ margin: 2 }}>
                  <FormLabel className='fw-bolder'>Table Name</FormLabel>
                  <Textarea placeholder="Type in here…" variant="outlined" type="text" name="table_name" value={formData.table_name} onChange={handleChange} />
                </FormControl> */}

                {/* <Form.Group className="mb-2" controlId="ControlInput2">
                  <Form.Label>Table Name</Form.Label>
                  <Form.Control type="text" placeholder="Table" className="file-input" name="table_name" value={formData.table_name} onChange={handleChange} />
                </Form.Group> */}

                <div className="d-flex justify-content-center my-3 mx-auto">
                  <Button variant="outline-dark" onClick={resetHandler} className='mx-2 px-4' style={{ borderRadius: '25px' }}>
                    Reset
                  </Button>

                  <Button variant="dark" type="submit" className='mx-2 px-4' style={{ borderRadius: '25px' }}>
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
          <Row className="justify-content-center align-items-left">
            <Col xs={3}>
              <TextField
                id="outlined-required"
                label="Database"
                name="db_name" value={formData.db_name} onChange={handleChange}
                className=''
                style={{ width: '100%' }}
                size="small"
              />
            </Col>
            <Col xs={2}>
              <TextField
                id="outlined-required"
                label="Table Name"
                name="table_name" value={formData.table_name} onChange={handleChange}
                style={{ width: '100%' }}
                size='small'
              />
            </Col>
            <Col xs={1}>
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>

    {tableData.length > 0 ? (
      <Container fluid className=''>
        <Container className='d-flex justify-content-center my-2'><h5 className='m-2 text-danger fw-bold'>AutoProfile Metadata</h5></Container>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead>
                <TableRow>
                  {tableData[0] &&
                    Object.keys(tableData[0]).map((key) => (
                      <TableCell key={key} style={{ minWidth: '100%', backgroundColor: "black", color: "white", border: '1px solid white', fontWeight: "bold" }}>{key}</TableCell>
                    ))}
                  <TableCell key="action" style={{ backgroundColor: "black", color: "white", border: '1px solid white', fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                      {Object.values(row).map((value, valueIndex) => (
                        <TableCell key={valueIndex} editable={editingRow === index}>
                          {editingRow === index ? (
                            <textarea
                              aria-label="empty textarea"
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
                        {editingRow === index ? (
                          <LoadingButton loading={false} loadingPosition="start" startIcon={<SaveIcon />} onClick={() => handleSave(index, row)}>
                            Save
                          </LoadingButton>
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
            rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


      </Container>) : <div className="d-flex justify-content-center m-2 blink">
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

    <Modal show={alert} onHide={() => setAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Data was updated suceessfully in Database</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setAlert(false)}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>


  </>);
};

export default AutoViewEdit;



MUI: The value provided to Autocomplete is invalid.
None of the options match with `"v"`.
You can use the `isOptionEqualToValue` prop to customize the equality test. 

console.js:273 MUI: The value provided to Autocomplete is invalid.
None of the options match with `"v"`.
You can use the `isOptionEqualToValue` prop to customize the equality test.


import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Breadcrumb, Modal } from 'react-bootstrap';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import { GridLoader } from "react-spinners";
import { TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import './AutoProfile.css'
import { FormControl, FormLabel, Autocomplete, Textarea } from '@mui/joy';


const AutoViewEdit = () => {

  const [formData, setFormData] = useState({
    db_name: '',
    table_name: '',
  });
  const [submitToggle, setSubmitToggle] = useState(false)
  const [editingRow, setEditingRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false)
  const [dataNotFound, setDataNotFound] = useState('')
  const [dbOptions, setDbOptions] = useState([])
  const [tableOptions, setTableOptions] = useState([])
  const [alert, setAlert] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }


  useEffect(() => {
    const fetchDBName = async (url) => {
      try {
        const response = await axios.get(url);
        setDbOptions(response.data.distinct_db || [])
      } catch (err) {
        console.error('Error fetching database names:', err);
      }
    };
    fetchDBName('http://tdcldizcva002.ebiz.verizon.com:8000/mle/DropdownDbAutoMLEMtd/');
  }, []);

  useEffect(() => {
    if (formData.db_name) {
      axios.post('http://tdcldizcva002.ebiz.verizon.com:8000/mle/DropdownDbAutoMLEMtd/', { DB_NAME: formData.db_name },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          setTableOptions(response.data.distinct_tbl);
        })
        .catch((error) => {
          console.error('Error fetching table names:', error);
        });
    } else {
      setTableOptions([]);
    }
  }, [formData.db_name]);

  const handleEdit = (index) => {
    setEditingRow(index);
  };

  const handleSave = async (index, row) => {
    console.log(`Saving edited data for row ${index}`, row);
    setEditingRow(null);
    setAlert(true)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios.post('https://tdcldizcva002.ebiz.verizon.com:8001/mle/ViewEditAutoMLEMtd/', formData, {
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
    setDataNotFound("")
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
          <Breadcrumb.Item active>Profiling</Breadcrumb.Item>
          <Breadcrumb.Item active>Auto Profile</Breadcrumb.Item>
          <Breadcrumb.Item active><span className='fw-bold'>View or Edit Metadata</span></Breadcrumb.Item>
        </Breadcrumb>
      </Container>

      <Container fluid className='mx-8 px-8 mb-2' style={{ display: (submitToggle === false) ? "block" : "none" }}>
        <Row className="d-flex justify-content-center align-items-center text-align-center my-xl-1">
          <Col xl={5}>
            <div className="px-5 py-2 rounded my-2">
              <h2 className="mb-2 text-center" style={{ color: '#EE0000' }}>AutoProfile Metadata</h2>
              <Form onSubmit={handleSubmit}>
                <FormControl sx={{ margin: 2 }}>
                  <FormLabel className="fw-bold">DB Name</FormLabel>
                  <Autocomplete
                    placeholder="Select your Option"
                    options={[...dbOptions, '']}
                    autoHighlight
                    name="db_name"
                    value={formData.db_name}
                    onChange={(_, value) => setFormData((prev) => ({ ...prev, db_name: value || '' }))}
                    isOptionEqualToValue={(option, value) => option === value}
                  />
                </FormControl>
                <FormControl sx={{ margin: 2 }}>
                  <FormLabel className="fw-bold">Table Name</FormLabel>
                  <Autocomplete
                    placeholder="Select your Option"
                    options={['', ...tableOptions]}
                    autoHighlight
                    name="table_name"
                    value={formData.table_name}
                    onChange={(_, value) => setFormData((prev) => ({ ...prev, table_name: value || '' }))}
                    isOptionEqualToValue={(option, value) => option === value}
                  />
                </FormControl>
                <div className="d-flex justify-content-center my-3 mx-auto">
                  <Button variant="outline-dark" onClick={resetHandler} className="mx-2 px-4" style={{ borderRadius: '25px' }}>
                    Reset
                  </Button>
                  <Button variant="dark" type="submit" className="mx-2 px-4" style={{ borderRadius: '25px' }}>
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
          <Row className="justify-content-center align-items-left">
            <Col xs={3}>
              <TextField
                id="outlined-required"
                label="Database"
                name="db_name" value={formData.db_name} onChange={handleChange}
                className=''
                style={{ width: '100%' }}
                size="small"
              />
            </Col>
            <Col xs={2}>
              <TextField
                id="outlined-required"
                label="Table Name"
                name="table_name" value={formData.table_name} onChange={handleChange}
                style={{ width: '100%' }}
                size='small'
              />
            </Col>
            <Col xs={1}>
              <Button variant="dark" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>

    {tableData.length > 0 ? (
      <Container fluid className=''>
        <Container className='d-flex justify-content-center my-2'><h5 className='m-2 text-danger fw-bold'>AutoProfile Metadata</h5></Container>
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">

              <TableHead>
                <TableRow>
                  {tableData[0] &&
                    Object.keys(tableData[0]).map((key) => (
                      <TableCell key={key} style={{ minWidth: '100%', backgroundColor: "black", color: "white", border: '1px solid white', fontWeight: "bold" }}>{key}</TableCell>
                    ))}
                  <TableCell key="action" style={{ backgroundColor: "black", color: "white", border: '1px solid white', fontWeight: "bold" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {tableData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                    <TableRow key={index} hover role="checkbox" tabIndex={-1} >
                      {Object.values(row).map((value, valueIndex) => (
                        <TableCell key={valueIndex} editable={editingRow === index}>
                          {editingRow === index ? (
                            <textarea
                              aria-label="empty textarea"
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
                        {editingRow === index ? (
                          <LoadingButton loading={false} loadingPosition="start" startIcon={<SaveIcon />} onClick={() => handleSave(index, row)}>
                            Save
                          </LoadingButton>
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
            rowsPerPageOptions={[10, 20, 30, 40, 50, 100]}
            component="div"
            count={tableData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>


      </Container>) : <div className="d-flex justify-content-center m-2 blink">
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

    <Modal show={alert} onHide={() => setAlert(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Data was updated suceessfully in Database</Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={() => setAlert(false)}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>


  </>);
};

export default AutoViewEdit;
