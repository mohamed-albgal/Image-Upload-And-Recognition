import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./App.css";


const emailRegex = RegExp(
  /^[a-zA-Z0-9.!’*+/=?^_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
// must >= 8 characters, at least one number, capital letter, and lowercase
const passwordRegex = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/);
// format: ###-###-####
const phoneNumberRegex = RegExp(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
// format: street, city, state zipcode
const addressRegex = RegExp(/^.*,.*,.*[0-9]+$/);


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

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: null,
      phoneNumber: null,
      address: null,
      email: null,
      password: null,
      formErrors: {
        fullName: "",
        phoneNumber: "",
        address: "",
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

      fetch("http://localhost:4000/users/add?email=" + this.state.email +
        "&password=" + this.state.password + "&cell=" + this.state.phoneNumber
        + "&address=" + this.state.address + "&name=" + this.state.fullName)
        .then(response => response.json())
        .then(response => {
          let result = response.accountID;
          if (result !== "Email already exists") {
            this.setState({ accountID: result, invalid: false }, () => {
              // if valid login, go to next page
              if (!this.state.invalid)
                this.props.history.push("login");
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
    case "fullName":
      formErrors.fullName =
        value.length < 3 ? "minimum 3 characaters required" : "";
      break;
    case "phoneNumber":
      formErrors.phoneNumber = phoneNumberRegex.test(value) ? "" :
        "invalid phone format";
      break;
    case "address":
      formErrors.address = addressRegex.test(value) ? "" : "invalid address";
      break;
    case "email":
      formErrors.email = emailRegex.test(value) ? "" :
        "invalid email address";
      break;
    case "password":
      formErrors.password = passwordRegex.test(value) ? ""
        : "minimum 8 characaters required and it must contain an " +
        "uppercase letter and a number";
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
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="fullName">
              <label htmlFor="fullName">Full Name</label>
              <input
                className={formErrors.fullName.length > 0 ? "error" : null}
                placeholder="Full Name"
                type="text"
                name="fullName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.fullName.length > 0 && (
                <span className="errorMessage">{formErrors.fullName}</span>
              )}
            </div>
            <div className="phoneNumber">
              <label htmlFor="phoneNumber">Phone Number</label>
              <NumberFormat format="###-###-####"
                className={formErrors.phoneNumber.length > 0 ? "error" : null}
                placeholder="###-###-####"
                type="tel"
                name="phoneNumber"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phoneNumber.length > 0 && (
                <span className="errorMessage">{formErrors.phoneNumber}</span>
              )}
            </div>
            <div className="address">
              <label htmlFor="address">Address</label>
              <input
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="Street Name, City, State Zipcode"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
            </div>
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
              <button type="submit">Create Account</button>
              <Link to="login"><small>Already Have an Account?</small></Link>
            </div>
            <div className="warningMessage">
              <p>{this.state.invalid ? "Account Already exist" : ""}</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}




export default RegisterPage;



/* <InputGroup>
        <Input placeholder="username" />
        <InputGroupAddon addonType="append">
          <InputGroupText>@example.com</InputGroupText>
        </InputGroupAddon>

        <Input type="password" placeholder="password" />
      </InputGroup> */