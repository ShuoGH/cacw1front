import React, { Component } from "react";
import { Button,FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { LinkContainer } from "react-router-bootstrap";

export default class Login extends Component {
  constructor(props) {
  //create a state obj to store what the user enters in the form
    super(props);
  //the form contains the email and the password. 
    this.state = {
      isLoading:false,
      email: "",
      password: "",
      isForget:null,        //indicate whether user click the button "forget password"
      forgetEmail:'',       //store the infomation of email user input.
      submitForget:null,   //input the email and submit, then this flag changed, and then render the newpassword from.
      verifyCode:"",        //store the verify code user input. 
      newPassword:"",       //store new password.
      confirmPassword:"",
    };
  }
  //Log in: validform to check the input
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  validateForgetForm() {
    return this.state.forgetEmail.length > 0;
  }
  validateNewPasswordForm() {
    return this.state.verifyCode.length > 0 &&
            this.state.newPassword === this.state.confirmPassword;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    // console.log([event.target.id],[event.target.value])  //use the test the input
  }
  //Log in: to submit to log in.
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({isLoading:true});

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.userIsAdmin()
    } catch (e) {
      alert(e.message);
    }
 }

  //Forget password: change the flag to render.
  handleForget = async event => {
    this.setState({isForget:true});
 }

//Forget password: input the username/email which you want to get new password
  handleForgetPassword = async event => {
    event.preventDefault();

    try {
      console.log(this.state.forgetEmail)
      Auth.forgotPassword(this.state.forgetEmail)
          .then(data => console.log(data))
      this.setState({submitForget:true})
    } catch (e) {
      alert(e);
    }
 }
 //Forget Password: input and confirm new password.
  confirmNewPassword = async event => {
    event.preventDefault();
    try {
      console.log("you will set new password.")
      Auth.forgotPasswordSubmit(this.state.forgetEmail, this.state.verifyCode, this.state.newPassword)
          .then(data => console.log(data))
          .catch(err => console.log(err));
      this.props.history.push("/");
      //this part is not very perfect.---11:23 14-11-2018
    } catch (e) {
      alert(e);
    }
 }
  //Forget password: when the isForget=true, this form is rendered to collect the email user input.
  renderForgetForm(){
    return (
      <form onSubmit={this.handleForgetPassword}>
          <FormGroup controlId="forgetEmail" bsSize="large">
            <ControlLabel>Input your email</ControlLabel>   
            <FormControl
              autoFocus
              // type="email"
              placeholder="Enter company email"
              value={this.state.forgetEmail}
              onChange={this.handleChange}
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateForgetForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Enter"
            loadingText="Logging in…"
          />
          <LinkContainer to="/" activeClassName="">
          <LoaderButton
            block
            bsStyle="default"
            bsSize="large"
            onClick={this.routechange}
            text="Cancel"
            loadingText="Returning…"
          />
          </LinkContainer>
      </form>
    );  
 }
  //Forget Password: input the verify code, to confirm new password.
  renderNewPassword(){
    return (
      <form onSubmit={this.confirmNewPassword}>
          <FormGroup controlId="verifyCode" bsSize="large">
            <ControlLabel>Input your verify code</ControlLabel>   
            <FormControl
              autoFocus
              type="tel"
              placeholder="Enter verify code"
              value={this.state.verifyCode}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="newPassword" bsSize="large">
            <ControlLabel>Input your new password</ControlLabel>   
            <FormControl
              placeholder="Enter your new password"
              value={this.state.newPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="confirmPassword" bsSize="large">
            <ControlLabel>Input your new password</ControlLabel>   
            <FormControl
              placeholder="Enter new password again"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <LoaderButton
            block
            bsSize="large"
            disabled={!this.validateNewPasswordForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Enter"
            loadingText="Logging in…"
          />
          <LinkContainer to="/" activeClassName="">
          <LoaderButton
            block
            bsStyle="default"
            bsSize="large"
            onClick={this.routechange}
            text="Cancel"
            loadingText="Returning…"
          />
          </LinkContainer>
      </form>
    );
  }


  //when the isForget is true, this part will be rendered.
  renderForget(){
    return (
      <div className="ForgetPassword">     
      {this.state.submitForget === null
        ? this.renderForgetForm()
        : this.renderNewPassword()}
      </div>
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