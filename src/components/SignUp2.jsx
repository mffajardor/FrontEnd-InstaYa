import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaKeycdn } from "@react-icons/all-files/fa/FaKeycdn";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { fname, lname, email, password } = this.state;
    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });

    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      alert("Formato del correo no válido");
    } else {
      formIsValid = true;
    }

    if (
      !password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
      )
    ) {
      formIsValid = false;
      alert(
        "La contraseña debe contener números, letras y caracteres - Longitud: Entre 8 y 15 caracteres"
      );
    } else {
      formIsValid = true;
    }
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header"><h1 className="text-center"> <FaKeycdn></FaKeycdn> InstaYa</h1></div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <h3 className="text-center">Registro</h3>

                  <div className="mb-3">
                    <label>Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={(e) => this.setState({ lname: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label>E-mail</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Sign Up
                    </button>
                  </div>
                  <br />
                  <br />
                  <p className="forgot-password text-right">
                    ¿Ya estas registrado? Ve al <a href="/sign-in">Sign In</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    );
  }
}
