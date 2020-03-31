import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { get } from "http";

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!’*+/=?^_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//for special character
//^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$
const passwordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);


const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      formErrors: {
        email: "",
        password: ""
      },
      invalid: false,
      accountID: ""
    };

  }



  handleSubmit = e => {
    // prevent the form from submit before validate
    e.preventDefault();

    // if everything is correct on the form
    if (formValid(this.state)) {

      fetch("http://localhost:4000/users/login?email=" + this.state.email +
        "&password=" + this.state.password)
        .then(response => response.json())
        .then(response => {
          //console.log(response);
          //if fetching and got back valid result
          if (response.length > 0) {
            this.setState({ accountID: response[0].accountID, invalid: false },
              () => {
                //   console.log(`
                //   --SUBMITTING--
                //   Email: ${this.state.email}
                //   Password: ****
                //   acc: ${this.state.accountID}
                //   Invalid: ${this.state.invalid}
                // `);
                // if valid login, go to next page
                if (!this.state.invalid){
                  setCookie(sessionInfo, this.state.email, {path: "/"});
                  this.props.history.push("home");
                }
              });
          }
          else // if fetching and get back nothing
            this.setState({ invalid: true }, () => {
              this.render();
            });
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }

  };



  handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
    case "email":
      formErrors.email = emailRegex.test(value) ? "" : "invalid email address";
      break;
    case "password":
      formErrors.password = passwordRegex.test(value) ? ""
        : "minimum 8 characaters required and it must contain an uppercase" +
        "letter and a number";
      break;
    default:
      break;
    }

    this.setState({ formErrors, [name]: value });
  };


  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Login Account</button>
              <Link to="register">
                <small>Don't Have An Account Yet?</small>
              </Link>
            </div>
            <div className="warningMessage">
              <p>{this.state.invalid ? "Invalid Username/Password!!" : ""}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
