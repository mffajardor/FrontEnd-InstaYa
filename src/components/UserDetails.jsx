import React, { Component } from "react";
import Navbarcomp from '../components/MainPage/Navbarcomp'

export default class UserDetails extends Component {
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
      <><Navbarcomp/>
      <div>
        Nombre:<h1>{this.state.userData.fname} {this.state.userData.lname}</h1>
        Correo:<h1>{this.state.userData.email}</h1>
      </div>
      </>
    );
  }
}