import React from "react";
import Header from "../Header/Header";
import NavbarHeader from "../NavbarHeader/NavbarHeader";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";
// import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const style = {
    margin: 0,
    padding: 0,
    boxsizing: "border-box",
  };
  return (
    <Container
      fluid
      className="d-flex flex-column min-vh-100"
      style={style}>
      <header>
        <Header />
        <NavbarHeader />
      </header>

      <main className="flex-grow-1">{children}</main>

      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export default Layout;
