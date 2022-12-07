import React, {Component} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaKeycdn } from "@react-icons/all-files/fa/FaKeycdn";

export default class Navbarcomp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: "",
    };
  }
  componentDidMount() {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        this.setState({ userData: data.data });
      });
  }
  render() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home"><FaKeycdn></FaKeycdn> InstaYa</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/userDetails">Crear envio</Nav.Link>
      </Nav>
      <Nav className="me-auto">
        <Nav.Link href="/envios">Ver envios</Nav.Link>
      </Nav>
      <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/userDetails/profile">{this.state.userData.fname} {this.state.userData.lname}</a>
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  )
  }
}