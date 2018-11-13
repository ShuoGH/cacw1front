import React, { Component } from "react";
import { Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";

export default class Login extends Component {
  constructor(props) {
  //create a state obj to store what the user enters in the form
    super(props);
  //the form contains the email and the password. 
    this.state = {
      isLoading:false,
      email: "",
      password: "",
      isForget:null,
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

  //this is used to handle the forget flag.
  handleForget = async event => {
    this.setState({isForget:true});
 }
  //when the isForget is true, this part will be rendered.
  renderForget(){
    return (
      <form>
       you fotget. this part will be add more to reset new password/
      </form>
    );  
 }

 renderLogin(){
    return (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>email</ControlLabel>   
            <FormControl
              autoFocus
              type="email"
              placeholder="Enter your company email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              placeholder="Enter your password"
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
          <Button block bsSize="small" bsStyle="default" onClick={this.handleForget} >Forget Password</Button>
          </form>

    );
 }
  render() {
    return(
      <div className="Login">
        {this.state.isForget === null
          ? this.renderLogin()
          : this.renderForget()}
      </div>
      )
  }
}