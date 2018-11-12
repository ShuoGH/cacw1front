import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./Profile.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      profile: null,
      email: "",
      gender:"",
      department:"",
      skill:"",
      project:"",
    };
  }

  async componentDidMount() {
    try {
      const profile = await this.getProfile();
      const { email,gender,department,skill,project } = profile;
//the project should exist in the projects list ---11:46 12-11-2018
      this.setState({
        profile,
        email,
        gender,
        department,
        skill,
        project,
      });
    } catch (e) {
      alert(e);
    }
  }

  getProfile() {
    return API.get("staff", `/staff/${this.props.match.params.id}`);
  }
  validateForm() {
    return this.state.gender.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveProfile(project) {
    return API.put("staff", `/staff/${this.props.match.params.id}`, {
      body: project
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveProfile({
        email: this.state.email,
        gender: this.state.gender,
        department: this.state.department,
        skill: this.state.skill,
        project:this.state.project,
        
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Profile">
        {this.state.profile &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email">
              <FormControl
                onChange={this.handleChange}
                value={this.state.email}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="gender">
              <FormControl
                onChange={this.handleChange}
                value={this.state.gender}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="department">
              <FormControl
                onChange={this.handleChange}
                value={this.state.department}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="skill">
              <FormControl
                onChange={this.handleChange}
                value={this.state.skill}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="project">
              <FormControl
                onChange={this.handleChange}
                value={this.state.project}
                componentClass="textarea"
              />
            </FormGroup>
            <ButtonToolbar className="pull-right">
            <LoaderButton
              
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />

            <LinkContainer to="/">
            <LoaderButton
              
              bsStyle="default"
              bsSize="large"
              onClick={this.routechange}
              text="Cancel"
              loadingText="Returning…"
            />
            </LinkContainer>
            </ButtonToolbar>
          </form>}
      </div>
    );
  }
}

//1. this is the page of updating the profile.  ---11:51 12-11-2018 finish    
//2. should change the lambda function, to put the email and some other attr into the table. ---13:49 12-11-2018 ..
