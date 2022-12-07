import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaKeycdn } from "@react-icons/all-files/fa/FaKeycdn";

export default class Reset extends Component {
  // Estados para el backend
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    // Modificar por recuperar el email
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        //Colocar alert - Con el backend
        alert(data.status);
      });
  }
  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col sm-4"></div>
          <div className="col sm-4">
            <br /> <br />
            <div className="card">
              <div className="card-header"><h1 className="text-center"> <FaKeycdn></FaKeycdn> InstaYa</h1></div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <h3>Recuperar Contraseña</h3>
                    <br />
                  <div className="mb-3">
                    <label>Correo</label>
                    
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                  <br />
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Enviar!!
                    </button>
                  </div>
                  <br />
                  <p className="forgot-password text-right">
                    <a href="/sign-in">Sign In</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="col sm-4"></div>
        </div>
      </div>
    );
  }
}
