import React, { useState } from "react";
import { NavDropdown, NavLink, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import './RuleProfileDropdown.css'

const RuleProfileDropdown = ({ selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <>
      {/* Rule PRofile */}
      <NavDropdown
        title="Rule Profile"
        show={isOpen}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`dropdown-button ${ selectedOption === "RuleProfile" ? "active" : ""}`}>

        {/* <NavLink className="dropdown-item"> */}
          <NavDropdown
            title="RantDT"
            drop="end"
            >
            <NavLink as={Link} to="/rantdt" className="dropdown-item">Submit Request</NavLink>
            <NavLink as={Link} to="/rantdtviewedit" className="dropdown-item">View/Edit Request</NavLink>
          </NavDropdown>
        {/* </NavLink> */}

        {/* <NavLink className="dropdown-item"> */}
          <NavDropdown
            title="Corp Data"
            drop="end"
            >
            <NavLink as={Link} to="/corpData" className="dropdown-item">Submit Request</NavLink>
            <NavLink as={Link} to="/corpDataviewedit" className="dropdown-item">View/Edit Request</NavLink>
          </NavDropdown>
        {/* </NavLink> */}

        {/* <NavLink className="dropdown-item"> */}
          <NavDropdown
            title="All Projects"
            drop="end"
            >
            <NavLink as={Link} to="/allProjects" className="dropdown-item">Submit Request</NavLink>
            <NavLink as={Link} to="/allProjectsviewedit" className="dropdown-item">View/Edit Request</NavLink>
          </NavDropdown>
        {/* </NavLink> */}

      </NavDropdown>
    </>
  );
};

export default RuleProfileDropdown;
