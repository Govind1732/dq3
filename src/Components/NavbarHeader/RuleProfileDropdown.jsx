import React, { useState } from "react";
import { NavDropdown, NavLink, DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
// import './RuleProfileDropdown.css'

const RuleProfileDropdown = ({ selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenRant, setIsOpenRant] = useState(false);
  const [isOpenCorp, setIsOpenCorp] = useState(false);
  const [isOpenAllProject, setIsOpenAllProject] = useState(false);

  return (
    <>
      {/* Rule PRofile */}
      <NavDropdown
        title="Rule Profile"
        show={isOpen}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`dropdown-button ${selectedOption === "RuleProfile" ? "active" : ""} `}>

        <NavDropdown
          title="RantDT"
          drop="end"
          show={isOpenRant}
          onMouseEnter={() => setIsOpenRant(true)}
          onMouseLeave={() => setIsOpenRant(false)}
        // className={`dropdown-menu ${selectedOption === "RuleProfile" ? "active" : ""} `}
        >
          <NavLink as={Link} to="/dataQuality/rantdt" className={`dropdown-item ${selectedOption === "RuleProfile" ? "active" : ""} `}>Submit Request</NavLink>
          <NavLink as={Link} to="/dataQuality/rantdtviewedit" className="dropdown-item">View/Edit Request</NavLink>
        </NavDropdown>

        <NavDropdown
          title="Corp Data"
          drop="end"
          show={isOpenCorp}
          onMouseEnter={() => setIsOpenCorp(true)}
          onMouseLeave={() => setIsOpenCorp(false)}
        // className={`dropdown-menu ${selectedOption === "RuleProfile" ? "active" : ""} `}
        >
          <NavLink as={Link} to="/dataQuality/corpData" className="dropdown-item">Submit Request</NavLink>
          <NavLink as={Link} to="/dataQuality/corpDataviewedit" className="dropdown-item">View/Edit Request</NavLink>
        </NavDropdown>

        <NavDropdown
          title="All Projects"
          drop="end"
          show={isOpenAllProject}
          onMouseEnter={() => setIsOpenAllProject(true)}
          onMouseLeave={() => setIsOpenAllProject(false)}
        >
          <NavLink as={Link} to="/dataQuality/allProjects" className="dropdown-item">Submit Request</NavLink>
          <NavLink as={Link} to="/dataQuality/allProjectsviewedit" className="dropdown-item">View/Edit Request</NavLink>
        </NavDropdown>

      </NavDropdown>
    </>
  );
};

export default RuleProfileDropdown;
