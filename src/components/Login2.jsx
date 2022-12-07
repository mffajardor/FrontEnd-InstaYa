import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaKeycdn } from "@react-icons/all-files/fa/FaKeycdn";

export default class Login extends Component {
  // Estados para el backend
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordError: "",
      emailError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);

    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("Iniciaste Sesión!!");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./userDetails";
        } else if (data.status == "error") {
          alert("Contraseña incorrecta!!");
        }
      });

    let formIsValid = true;

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      formIsValid = false;
      alert("Formato del correo no válido");
    } else {
      formIsValid = true;
    }

    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/)) {
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
          <div className="col-sm-4"></div>
          <div className="col-sm-4">
            <br />
            <br />
            <div className="card">
              <div className="card-header">
                <h1 className="text-center"> <FaKeycdn></FaKeycdn> InstaYa</h1>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <h3 className="text-center">Sign In</h3>

                  <div className="mb-3">
                    <label>Correo</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Ingresa e-mail"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Ingresa la contraseña"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <div className="custom-control custom-checkbox">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customCheck1"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customCheck1"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      Enviar!!
                    </button>
                  </div>
                  <br/>
                  <p className="forgot-password text-right">
                    <a href="/sign-up">Sign Up</a>
                  </p>
                  <p className="forgot-password text-right">
                    <a href="/reset">Reestablecer Password</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    );
  }
}
