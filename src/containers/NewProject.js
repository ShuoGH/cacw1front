import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import "./NewProject.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createProject({
        content: this.state.content
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
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
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
//1. modify the button style to create.---16:20 11-11-2018