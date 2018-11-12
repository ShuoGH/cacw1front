import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import "./NewProfile.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      email:"",
      gender: "",
      department:"",
      skill:"",
      pname:""
    };
  }
//i think i should add the part of email. 
  validateProfile() {
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
      await this.createProfile({
        email: this.state.email,
        gender: this.state.gender,
        department:this.state.department,
        skill:this.state.skill,
        pname: this.state.pname,
      });
      this.props.history.push("/stafflist");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createProfile(profile) {
    return API.post("staff", "/staff", {
      body: profile
    });
  }
//the projects api is the api endpoint i want invoke.
  render() {
    return (
      <div className="NewProfile">      
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.email}
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
            disabled={!this.validateProfile()}
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