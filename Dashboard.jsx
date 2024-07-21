import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">MyLogo</div>
        <div className="menu-icon" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li>
            <a href="#home">Help</a>
          </li>
          <li>
            <a href="#about">My Request</a>
          </li>
          <li>
            <a href="#services">My Issues</a>
          </li>
          <li>
            <a href="#contact">Profile</a>
          </li>
        </ul>
      </nav>
      <div className="section">
        <div className="sidebar">
          <ul>
            <li>
              <button>
                <span className="sidebar-items">Home</span>
              </button>
            </li>
            <li>
              <button>
                <span className="sidebar-items">Profile</span>
              </button>
            </li>
            <li>
              <button>
                <span className="sidebar-items">Services</span>
              </button>
            </li>
            <li>
              <button>
                <span className="sidebar-items">Reports</span>
              </button>
            </li>
          </ul>
        </div>

        <div class="container">
          <div class="centered-div">
            {/* <datalist>
              <value>sdssd</value>
              <option>sdssd</option>
              <option>sdssd</option>
              <option>sdssd</option>
            </datalist> */}
            <select className="projectDropdown">
              <option disabled>--select--</option>
              <option>option1</option>
              <option>option2</option>
              <option>option3</option>
              <option>option4</option>
              <option>option5</option>
              <option>option5</option>
              <option>option6</option>
            </select>


          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;
