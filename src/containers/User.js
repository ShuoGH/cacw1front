import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./User.css";
import { LinkContainer } from "react-router-bootstrap";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      user: null,
      username:"",
      email: "",
      tel:"",
      gender:"",
      department:"",
      skill:"",
      interest:"",
      pname:"",
      ismanager:"",
    };
    // console.log("test",this.props)
  }

  async componentDidMount() {
    try {
      // console.log("print the state:",this.state.user)   
      const user = await this.getProfile();
      // console.log("bug code",user);
      const { username,email,tel,gender,department,skill,interest,pname } = user;
//the project should exist in the projects list ---11:46 12-11-2018
      this.setState({
        user,
        username,
        email,
        tel,
        gender,
        department,
        skill,
        interest,
        pname,
      });
      // console.log("print the props:",this.props.match.params.id)   //use this to print the string trying to know the bug.---13:03 13-11-2018
      // console.log("print the state user:",this.state.user)    //output is wrong.
    } catch (e) {
      alert(e);
    }
  }

  getProfile() {
    console.log("print the props in the function getProfile:",this.props,this.props.match)
    return API.get("staff", `/staff/${this.props.match.params.id}`);
    //the front end is right. but there are some problems in the API function.
  }
  validateForm() {
    return this.state.gender.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveProfile(user) {
    return API.put("staff", `/staff/${this.props.match.params.id}`, {
      body: user
    });
  }
  deleteProfile() {
    return API.del("staff", `/staff/${this.props.match.params.id}`);
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveProfile({
        username: this.state.username,
        email: this.state.email,
        tel: this.state.tel,
        gender: this.state.gender,
        department: this.state.department,
        skill: this.state.skill,
        interest: this.state.interest,
        pname:this.state.pname,
        
      });
      this.props.history.push("/stafflist");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  //admin can delete the user info in the database.
  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete the information of this user from database?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteProfile();
      this.props.history.push("/stafflist");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  render() {
    return (
      <div className="Profile">
        {this.state.user &&
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
            <FormGroup controlId="interest">
            <ControlLabel>interest</ControlLabel>
              <FormControl
                onChange={this.handleChange}
                value={this.state.interest}
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
            <LoaderButton
              
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
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

//1. this is the page of updating the user.  ---11:51 12-11-2018 finish    
//2. should change the lambda function, to put the email and some other attr into the table. ---13:49 12-11-2018 finish
//3. there are a lot of bugs in this part. ---22:19 12-11-2018 ... 
//4. the admin's function on creating the user is a bug. ---10:31 13-11-2018  ...
//   ...................API invoking is wrong.