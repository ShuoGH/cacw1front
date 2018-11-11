import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
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
  //my GET http requestion is the ..../prod/projects

//below are all the content which need to be loaded 
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

  renderLander() {
    return (
      <div className="lander">
        <h1>App</h1>
        <p>My mess code.</p>
        <p> this will show when you log out</p>
      </div>
    );
  }

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
      <div className="Home">
        {this.props.isAuthenticated ? this.renderProjects() : this.renderLander()}   
      </div>
    );
  }
  //if is authenticated, render projects list, else then render the lander. 
}

