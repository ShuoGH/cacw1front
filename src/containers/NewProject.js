import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar,ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import "./NewProject.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      pname: "",
      pmanager: "",
      pstatus: "",
    };
  }
//validate the project name, is should be bigger than 0. 
  validateForm() {
    return this.state.pname.length > 0;
  }
//handle the changes when you change the input.
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
//handle the submit, to invoke the API and do action on the database.
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createProject({
        pname: this.state.pname,
        pmanager:this.state.pmanager,
        pstatus:this.state.pstatus
      });
      this.props.history.push("/projectslist");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createProject(project) {
    return API.post("projects", "/projects", {
      body: project
    });
  }
//the projects api is the api endpoint i want invoke.
  render() {
    return (
      <div className="NewProject">
      <h1>New Project</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="pname">
          <ControlLabel>Project Name</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.pname}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="pmanager">
          <ControlLabel>Project Manager</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.pmanager}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="pstatus">
          <ControlLabel>status</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.status}
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
            text="Create"
            loadingText="Creating…"
          />
          <LinkContainer to="/projectslist">
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
//the </form> tag should include the buttons, or the submit action can't be invoked successfully. ---22:02 12-11-2018

//1. modify the button style to create.---16:20 11-11-2018