import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./Projects.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      project: null,
      content: "",
    };
  }

  async componentDidMount() {
    try {
      const project = await this.getProject();
      const { content } = project;

      this.setState({
        project,
        content,
      });
    } catch (e) {
      alert(e);
    }
  }

  getProject() {
    return API.get("projects", `/projects/${this.props.match.params.id}`);
  }
  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  saveProject(project) {
    return API.put("projects", `/projects/${this.props.match.params.id}`, {
      body: project
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.saveProject({
        content: this.state.content,
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }


  deleteProject() {
    return API.del("projects", `/projects/${this.props.match.params.id}`);
  }

  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });

    try {
      await this.deleteProject();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }
  render() {
    return (
      <div className="Projects">
        {this.state.project &&
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

//1. add a new button in the projects page.