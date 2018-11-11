import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Profile.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      content: "",
    };
  }

  async componentDidMount() {
    try {
      const profile = await this.getProfile();
      const { content } = profile;

      this.setState({
        profile,
        content,
      });
    } catch (e) {
      alert(e);
    }
  }

  getProfile() {
    return API.get("staff", `/staff/${this.props.match.params.id}`);
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
      await this.saveProject({
        content: this.state.content,
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
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

//1. to create a page containing the profile of user ---16:55 11-11-2018