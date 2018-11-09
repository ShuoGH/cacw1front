import React, { Component } from "react";
import { Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default class Login extends Component {
  constructor(props) {
  //create a state obj to store what the user enters in the form
    super(props);
  //the form contains the email and the password. //maybe i should change the email to username
    this.state = {
      isLoading:false,
      email: "",
      password: ""
    };
  }
  //validform to check the input
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({isLoading:true});

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
    }
  }
//i change the element in the page. change the email to the username
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Username</ControlLabel>   
            <FormControl
              autoFocus
              placeholder="Enter username"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              placeholder="Enter password"
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Login"
            loadingText="Logging in…"
          />
          <Button block bsSize="small" >Forget Password</Button>
        </form>
      </div>
    );
  }
}

//1. add the forget password button but didn't add the logic to realize it. should add a onClick function. ---17:50 09-11-2018