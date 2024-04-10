import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
// import '../index.css'; // Import your custom CSS file
import { Button, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


const AutoViewEdit = () => {

  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // Keeps track of currently editing row index

  const handleSubmit = async () => {
    // Replace with your actual API call logic
    const response = await fetch('');
    const data = await response.json();
    setTableData(data);
  };

  const handleEdit = (index) => {
    setEditingRow(index); // Mark the row as editing
  };

  const handleSave = async (index, row) => {
    // Implement logic to update data in database based on edited row values
    console.log(`Saving edited data for row ${index}`, row);
    setEditingRow(null); // Stop editing after saving
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center my-xl-1">
        <Col xl={5}>
          <div className="px-5 py-2 rounded shadow-lg my-2">
            <h2 className="mb-2 text-center">Auto Profile View or Edit</h2>
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-2" controlId="ControlInput1">
                <Form.Label>DB Name</Form.Label>
                <Form.Control type="text" placeholder="Database" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput2">
                <Form.Label>Table Name</Form.Label>
                <Form.Control type="text" placeholder="Table" className="file-input" />
              </Form.Group>

              <Form.Group className="mb-2" controlId="ControlInput3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control type="email" placeholder="Email Id" className="file-input" />
              </Form.Group>

              <div className="d-flex justify-content-center mb-2">
                <Button variant="dark" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      {tableData.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {tableData[0] &&
                  Object.keys(tableData[0]).map((key) => (
                    <TableCell key={key}>{key}</TableCell>
                  ))}
                <TableCell key="action">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  {Object.values(row).map((value, valueIndex) => (
                    <TableCell key={valueIndex} editable={editingRow === index}>
                      {editingRow === index ? (
                        <TextField
                          defaultValue={value}
                          onBlur={(e) => {
                            const updatedRow = { ...row };
                            updatedRow[Object.keys(row)[valueIndex]] = e.target.value;
                            // Update your data source (tableData) with the edited value
                          }}
                        />
                      ) : (
                        value
                      )}
                    </TableCell>
                  ))}
                  <TableCell key={`action-${index}`}>
                    {editingRow === index ? (
                      <IconButton onClick={() => handleSave(index, row)}>
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AutoViewEdit;
