import React, { useState } from "react";
import { NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const AutoProfileDropdown = ({ selectedOption,endpoint,selectedProfileOption}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const style = {
    margin: 0,
    padding: 0,
    boxsizing: "border-box",
  };
  return (
    <>
    <NavDropdown
      title={<span style={{fontWeight:"normal"}}>Auto Profile</span>}
      show={isOpen}
      drop="end" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`dropdown-item ${selectedProfileOption === "AutoProfile" ? "active" : ""}`}
      >
      <NavLink as={Link} to="/dataQuality/autoProfile" className={`dropdown-item ${endpoint === "/dataQuality/autoProfile" ? "active" : ""}`}>
        Submit Request
      </NavLink>
      <NavLink as={Link} to="/dataQuality/autoviewedit" className={`dropdown-item ${endpoint === "/dataQuality/autoviewedit" ? "active" : ""}`}>
        View/Edit Matadata
      </NavLink>
      <NavLink as={Link} to="/dataQuality/autoProfileAPI" className={`dropdown-item ${endpoint === "/dataQuality/autoProfileAPI" ? "active" : ""}`}>
        AutoProfileAPI
      </NavLink>
    </NavDropdown>
    </>
  );
};

export default AutoProfileDropdown;
Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
    at a
