import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./ProjectsList.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      project: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const project = await this.projects();
      this.setState({ project });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  projects() {
    console.log("to get the api")
    return API.get("projects", "/projects");
  }
  //this is the url when you invoke your api. 
  renderProjectsList(projects) {
    return [{}].concat(projects).map(
      (project, i) =>
        i !== 0
          ? <LinkContainer
              key={project.projectid}
              to={`/projects/${project.projectid}`}
            >
              <ListGroupItem header={project.content.trim().split("\n")[0]}>
                {"Created: " + new Date(project.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/projects/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new project
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  //when the i ==0, create the item which is the "create a new project" ---18:18 09-11-2018
  renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Your Projects</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderProjectsList(this.state.project)} 
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="ProjectsList">
        {this.renderProjects()}   
      </div>
    );
  }
}
//1. the code in this part is removed from the home page. ---11:15 12-11-2018
