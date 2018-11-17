import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar, ControlLabel,Form} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./Profile.css";
//change it later ---16:09 14-11-2018
import { LinkContainer } from "react-router-bootstrap";

export default class Profile extends Component {
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
    console.log("heiheihei",this.props)
  }

  async componentDidMount() {
    try {
      // console.log("print the state:",this.state.user)  
      const user = await this.getProfile();
      console.log("bug code",user);
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
      // console.log("print the props:",this.props.match.params.id)  
      // console.log("print the state user:",this.state.user)    
    } catch (e) {
      alert(e);
    }
  }

  getProfile() {
    // console.log("print the props in the function getProfile:",this.props.match.params.id)
    return API.get("profile", `/profile/${this.props.match.params.id}`);
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
    return API.put("profile", `/profile/${this.props.match.params.id}`, {
      body: user
    });
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
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="Profile">
        {this.state.user &&
          <form onSubmit={this.handleSubmit}>
          <h1> you can update your profile here</h1>
          <Form inline>
            <FormGroup controlId="username">
            <ControlLabel>username:</ControlLabel>{" "}
              <FormControl.Static>{this.state.username}</FormControl.Static>
            </FormGroup>{" "}
            <FormGroup controlId="gender">
            <ControlLabel>gender:</ControlLabel>{" "}
              <FormControl
                onChange={this.handleChange}
                value={this.state.gender}
                componentClass="select">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </FormControl>
            </FormGroup>
            </Form>
            <FormGroup controlId="email">
            <ControlLabel>Email</ControlLabel>
              <FormControl
              type="Email"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </FormGroup>
            <FormGroup controlId="tel">
            <ControlLabel>phone number</ControlLabel>
              <FormControl
              type="text"
                onChange={this.handleChange}
                value={this.state.tel}
              />
            </FormGroup>
            <FormGroup controlId="skill">
            <ControlLabel>Skill</ControlLabel>
              <FormControl
              type="text"
                onChange={this.handleChange}
                value={this.state.skill}
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
             <ControlLabel>              </ControlLabel>
            <FormGroup controlId="department">
            <ControlLabel>Department</ControlLabel>
              <FormControl
              type="text"
                onChange={this.handleChange}
                value={this.state.department}
              />
            </FormGroup>
            <Form inline>
            <FormGroup controlId="pname">
            <ControlLabel>Project Name: </ControlLabel>
              <FormControl.Static>{this.state.pname}</FormControl.Static>
            </FormGroup>{"    "}
            </Form>
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

//1. this is the page of updating the user.  ---11:51 12-11-2018 finish    
//2. should change the lambda function, to put the email and some other attr into the table. ---13:49 12-11-2018 finish
//3. there are a lot of bugs in this part. ---22:19 12-11-2018 finish
//4. the admin's function on creating the user is a bug. ---10:31 13-11-2018  finish