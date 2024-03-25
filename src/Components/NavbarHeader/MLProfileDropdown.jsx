import React, { useState } from "react";
import { NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const MLProfileDropdown = ({ selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <NavDropdown
      title="ML Profile"
      show={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`dropdown-button ${selectedOption === "MLProfile" ? "active" : ""}`}>
      <NavLink as={Link} to="/mlProfile" className="dropdown-item">
        Submit Request
      </NavLink>
      <NavLink as={Link} to="/mlProfileReports" className="dropdown-item">
        Download Reports
      </NavLink>
    </NavDropdown>
  );
};

export default MLProfileDropdown;
