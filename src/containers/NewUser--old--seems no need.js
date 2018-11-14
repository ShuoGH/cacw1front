import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import "./NewUser.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      username:"",
      email:"",
      gender: "",
      tel:"",
      department:"",
      skill:"",
      interest:"",
      pname:"",
      ismanager:false,
    };
  }
//i think i should add the part of email. 
  validateUser() {
    return this.state.gender.length > 0;
  }
// the dapartment should not empty.
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createUser({
        username:this.state.username,
        email: this.state.email,
        tel:this.state.tel,
        gender: this.state.gender,
        department:this.state.department,
        skill:this.state.skill,
        interest:this.state.interest,
        pname: this.state.pname,
        ismanager:this.state.ismanager,
      });
      this.props.history.push("/stafflist");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createUser(user) {
    return API.post("staff", "/staff", {
      body: user
    });
  }
//the projects api is the api endpoint i want invoke.
  render() {
    return (
      <div className="NewUser">      
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username">
          <ControlLabel>username</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.username}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.email}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="tel">
          <ControlLabel>phone number</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.tel}
              componentClass="textarea"
            />
          </FormGroup>
          <ControlLabel>Gender</ControlLabel>
          <FormGroup controlId="gender">
            <FormControl
              onChange={this.handleChange}
              value={this.state.gender}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="department">
            <ControlLabel>department</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.department}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="skill">
            <ControlLabel>skill</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.skill}
              componentClass="textarea"
            />
            </FormGroup>
          <FormGroup controlId="interest">
          <ControlLabel>interest</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.interest}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="pname">
            <ControlLabel>project name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.pname}
              componentClass="textarea"
            />
            </FormGroup>
          <ButtonToolbar className="pull-right">
          <LoaderButton
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateUser()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
          <LinkContainer to="/stafflist">
          <LoaderButton
            bsStyle="default"
            bsSize="large"
            text="Cancel"
            loadingText="Returning…"
          />
          </LinkContainer>
          </ButtonToolbar>
        </form>
      </div>
    );
  }
}
//1. there are bugs here. ---22:40 12-11-2018