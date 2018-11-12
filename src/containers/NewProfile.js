import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import "./NewProfile.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      gender: "",
      department:"",
      skill:"",
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
        gender: this.state.gender,
        department:this.state.department,
        skill:this.state.skill,

      });
      this.props.history.push("/");
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
          <p>Gender</p>
          <FormGroup controlId="gender">
            <FormControl
              onChange={this.handleChange}
              value={this.state.gender}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="department">
            <p>department</p>
            <FormControl
              onChange={this.handleChange}
              value={this.state.department}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="skill">
            <p>skill</p>
            <FormControl
              onChange={this.handleChange}
              value={this.state.skill}
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
//1. modify the button style to create.---16:20 11-11-2018