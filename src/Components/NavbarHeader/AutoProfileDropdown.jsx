import React, { useState } from "react";
import { NavDropdown, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

const AutoProfileDropdown = ({ selectedOption}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <>
    <NavDropdown
      title="Auto Profile"
      show={isOpen} 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`dropdown-button ${selectedOption === "AutoProfile" ? "active" : ""}`}
    >
      <NavLink as={Link} to="/autoProfile" className="dropdown-item">
        Submit Request
      </NavLink>
      <NavLink as={Link} to="/autoviewedit" className="dropdown-item">
        View/Edit Request
      </NavLink>
    </NavDropdown>
    </>
  );
};

export default AutoProfileDropdown;
