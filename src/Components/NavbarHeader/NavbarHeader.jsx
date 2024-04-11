// import React, { useState,useEffect } from "react";
// import {
//   Container,
//   Navbar,
//   NavbarText,
//   Image,
//   Nav,
//   NavDropdown,
//   Dropdown,
//   DropdownButton,
//   Stack,
//   NavItem,
// } from "react-bootstrap";
// import { Link,useLocation } from "react-router-dom";
// import "./NavbarHeader.css";

// const NavbarHeader = () => {

//   const location = useLocation();
//   const [endpoint, setEndpoint] = useState(location.pathname);
//   const [selectedOption, setSelectedOption] = useState(null);

//   useEffect(() => {
//     setEndpoint(location.pathname);
//   }, [location]);

//   useEffect(() => {
//     // Update selectedOption based on endpoint
//     if (endpoint === "/autoviewedit" || endpoint === "/autoProfile") {
//       setSelectedOption("AutoProfile");
//     } else if (endpoint === "/") {
//       setSelectedOption("Home");
//     }
//     else if (endpoint === "/mlProfile" || endpoint === "/mlProfileReports") {
//       setSelectedOption("MLProfile");
//     }
//     // Add more conditions for other options if needed
//   }, [endpoint]);

//   // dropdown hover
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   //const [RuleProfiledropdown, setRuleProfileDropdown] = useState(false);

//   const handleDropdownToggle = (isOpen) => {
//     setDropdownOpen(isOpen);
//   };

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//     setDropdownOpen(false);
//   };
//   console.log(endpoint)

//   const style = {
//     padding: "0",
//     margin: "0",
//     boxSizing: "border-box",
//   };

//   return (

//     <Navbar style={style} bg="dark" data-bs-theme="dark">
//         <Container>
//           <Navbar.Toggle aria-controls="nav" />
//           <Navbar.Collapse id="nav" style={style}>
//             <Nav
//               className="me-auto"

//               style={style}>

//               {/* Home */}
//               <Nav.Item>
//               <Nav.Link
//                 to="/"
//                 as={Link}
//                 style={{
//                   backgroundColor: selectedOption === "Home" ? "white" : "black",
//                   color: selectedOption === "Home" ? "black" : "white",
//                 }}
//                 >
//                 Home
//               </Nav.Link>
//               </Nav.Item>

//               {/* Auto Profile */}
//               <Nav.Item>
//               <NavDropdown
//                 title="Auto Profile"
//                 menuVariant="dark"

//                 show={dropdownOpen==='AutoProfile'}

//                 onMouseEnter={() => setDropdownOpen("AutoProfile")}
//                 onMouseLeave={() => setDropdownOpen(null)}

//                 style={{
//                   backgroundColor: selectedOption === "AutoProfile" ? "white" : "transparent",
//                   color: selectedOption === "AutoProfile" ? "black" : "white",

//                 }}

//                 >
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/autoProfile"
//                   className="dropdown-item-custom"
//                   >
//                   Submit Request
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/autoviewedit"

//                   className="dropdown-item-custom">
//                   View/Edit Request
//                 </NavDropdown.Item>
//               </NavDropdown>
//               </Nav.Item>

// {/* Rule Profile */}
// <Nav.Item>
//               <NavDropdown
//                 title="Rule Profile"
//                 menuVariant="dark"

//                 show={dropdownOpen==='AutoProfile'}

//                 onMouseEnter={() => setDropdownOpen("AutoProfile")}
//                 onMouseLeave={() => setDropdownOpen(null)}
//                 style={{
//                   backgroundColor: selectedOption === "AutoProfile" ? "white" : "transparent",
//                   color: selectedOption === "AutoProfile" ? "black" : "white",
//                 }}

//                 >
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/autoProfile"
//                   className="dropdown-item-custom"
//                   >
//                   Submit Request
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/autoviewedit"

//                   className="dropdown-item-custom">
//                   View/Edit Request
//                 </NavDropdown.Item>
//               </NavDropdown>
//               </Nav.Item>

//               {/* Rule PRofile */}
//               <Dropdown
//                 data-bs-theme="dark"
//                 show={dropdownOpen==='RuleProfile'}

//                 onMouseEnter={() => handleDropdownToggle("RuleProfile")}
//                 onMouseLeave={() => handleDropdownToggle(null)}>
//                 <Dropdown.Toggle
//                   variant="dark"
//                   style={{
//                     backgroundColor:
//                       selectedOption === "RuleProfile"
//                         ? "white"
//                         : "transparent",
//                     color: selectedOption === "RuleProfile" ? "black" : "white",
//                   }}>
//                   <span>Rule Profile</span>
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu>
//                   {/* Rant DT */}
//                   <Dropdown
//                     data-bs-theme="dark"
//                     drop="end"
//                     show={dropdownOpen === "RantDT"}
//                     onMouseEnter={() => handleDropdownToggle("RantDT")}
//                     onMouseLeave={() => handleDropdownToggle(null)}>
//                     <Dropdown.Toggle variant="dark">
//                       <span className="p-4">RANT DT</span>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/rantdt"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         Submit Request
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/rantdtviewedit"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         View/Edit Request
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>

//                   {/* corpData */}
//                   <Dropdown
//                     data-bs-theme="dark"
//                     drop="end"
//                     show={dropdownOpen === "corpData"}
//                     onMouseEnter={() => handleDropdownToggle("corpData")}
//                     onMouseLeave={() => handleDropdownToggle(null)}>
//                     <Dropdown.Toggle variant="dark">
//                       <span className="p-4">corpData</span>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/corpData"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         Submit Request
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/corpDataviewedit"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         View/Edit Request
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>

//                   {/* All Projects */}
//                   <Dropdown
//                     data-bs-theme="dark"
//                     drop="end"
//                     show={dropdownOpen === "AllProjects"}
//                     onMouseEnter={() => handleDropdownToggle("AllProjects")}
//                     onMouseLeave={() => handleDropdownToggle(null)}>
//                     <Dropdown.Toggle variant="dark">
//                       <span className="p-3">All Projects</span>
//                     </Dropdown.Toggle>
//                     <Dropdown.Menu>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/allProjects"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         Submit Request
//                       </Dropdown.Item>
//                       <Dropdown.Item
//                         as={Link}
//                         to="/allprojectviewedit"
//                         onClick={() => handleOptionSelect("RuleProfile")}
//                         className="dropdown-item-custom">
//                         View/Edit Request
//                       </Dropdown.Item>
//                     </Dropdown.Menu>
//                   </Dropdown>
//                 </Dropdown.Menu>
//               </Dropdown>

//               <NavDropdown
//                 title="ML Profile"
//                 menuVariant="dark"

//                 show={dropdownOpen==='MLProfile'}

//                 onMouseEnter={() => setDropdownOpen("MLProfile")}
//                 onMouseLeave={() => setDropdownOpen(null)}
//                 as={NavItem}
//                 style={{
//                   backgroundColor: selectedOption === "MLProfile" ? "white" : "transparent",
//                   color:selectedOption === "MLProfile" ? "black" : "white",
//                 }}

//                 >
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/mlProfile"
//                   className="dropdown-item-custom"
//                   >
//                   Submit Request
//                 </NavDropdown.Item>
//                 <NavDropdown.Item
//                   as={Link}
//                   to="/mlProfileReports"

//                   className="dropdown-item-custom">
//                   Download Reports
//                 </NavDropdown.Item>
//               </NavDropdown>

//               {/* </Stack> */}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//   )
// }

// export default NavbarHeader

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Navbar, Nav, NavLink, Stack } from "react-bootstrap";
import AutoProfileDropdown from "./AutoProfileDropdown";
import RuleProfileDropdown from "./RuleProfileDropdown";
import MLProfileDropdown from "./MLProfileDropdown";
// import APISubscriptionDropdown from './APISubscriptionDropdown'
import "./NavbarHeader.css";

const NavbarHeader = () => {

  const location = useLocation();
  const [endpoint, setEndpoint] = useState(location.pathname);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setEndpoint(location.pathname);
  }, [location]);

  useEffect(() => {
    // Update selectedOption based on endpoint
    if (endpoint === "/dataQuality") {
      setSelectedOption("Home");
    } else if (endpoint === "/dataQuality/autoProfile" || endpoint === "/dataQuality/autoviewedit") {
      setSelectedOption("AutoProfile");
    } else if (
      endpoint === "/dataQuality/rantdt" ||
      endpoint === "/dataQuality/rantdtviewedit" ||
      endpoint === "/dataQuality/corpData" ||
      endpoint === "/dataQuality/corpDataviewedit" ||
      endpoint === "/dataQuality/allProjects" ||
      endpoint === "/dataQuality/allProjectsviewedit"
    ) {
      setSelectedOption("RuleProfile");
    } else if (endpoint === "/dataQuality/mlProfile" || endpoint === "/dataQuality/mlProfileReports") {
      setSelectedOption("MLProfile");
    }
    else{
      setSelectedOption('')
    }
  },[endpoint]);

  const style = {
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
  };
  return (
    <Navbar bg="dark" variant="dark" style={style} expand="sm">
      <Container fluid className="ms-5">
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav>
            <Stack direction="horizontal" gap={3}>
              <NavLink
                as={Link}
                to="/dataQuality"
                style={{
                  backgroundColor:
                    selectedOption === "Home" ? "white" : "black",
                  color: selectedOption === "Home" ? "black" : "white",
                }}
                >
                <span className="fw-bold">Home</span>
              </NavLink>
              <AutoProfileDropdown selectedOption={selectedOption} />
              <RuleProfileDropdown selectedOption={selectedOption} />
              <MLProfileDropdown selectedOption={selectedOption} />
              {/* <APISubscriptionDropdown selectedOption={selectedOption} /> */}
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
