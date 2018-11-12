import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar, ControlLabel} from "react-bootstrap";
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
      pname:"",
    };
  }

  async componentDidMount() {
    try {
      const profile = await this.getProfile();
      const { email,gender,department,skill,pname } = profile;
//the project should exist in the projects list ---11:46 12-11-2018
      this.setState({
        profile,
        email,
        gender,
        department,
        skill,
        pname,
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

  saveProfile(profile) {
    return API.put("staff", `/staff/${this.props.match.params.id}`, {
      body: profile
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
        pname:this.state.pname,
        
      });
      this.props.history.push("/stafflist");
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
            <ControlLabel>Email</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.email}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="gender">
            <ControlLabel>gender</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.gender}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="department">
            <ControlLabel>Department</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.department}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="skill">
            <ControlLabel>Skill</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.skill}
                componentClass="textarea"
              />
            </FormGroup>
            <FormGroup controlId="pname">
            <ControlLabel>Project Name</ControlLabel>
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
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />

            <LinkContainer to="/stafflist">
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
//3. there are a lot of bugs in this part. ---22:19 12-11-2018