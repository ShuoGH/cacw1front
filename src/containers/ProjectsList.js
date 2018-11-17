import React, { Component } from "react";
import {PageHeader,
        ListGroup,
        ListGroupItem,
        Tab,Tabs, 
        FormGroup,
        FormControl,
        Form, 
        ControlLabel,
        ButtonToolbar,
        Button } from "react-bootstrap";
import "./ProjectsList.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";

export default class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      project: [],

      searchText:"", 
      searchResult:[],

      listResult:[],
      status:"",
    };
  }
//ALL list: this is going to show the list of all projects
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
// invoke the api to get all projects.
  projects() {
    console.log("to get the api")
    return API.get("projects", "/projects");
  }
  validateForm() {
    return this.state.searchText.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
//support the search function.
  handleSubmitSearch = async event => {
    event.preventDefault();

    try {
      const searchResult= await this.searchProject();
      console.log("this is from the submit search",searchResult)
      this.setState({ searchResult:searchResult.data });
      //because the format of the return result, i should add the .data in this line.
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }
//support the "list by status" function.
  handlePendingList = async event => {
    event.preventDefault();

    try {
      const listResult= await this.getPendingList();
      console.log("this is pending list",listResult)
      this.setState({listResult:listResult,status:"pending"})
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }  
  handleActiveList = async event => {
    event.preventDefault();

    try {
      const listResult= await this.getActiveList();
      console.log("this is pending list",listResult)
      this.setState({listResult:listResult,status:"active"})
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  } 
  handleCompletedList = async event => {
    event.preventDefault();

    try {
      const listResult= await this.getCompletedList();
      console.log("this is pending list",listResult)
      this.setState({listResult:listResult,status:"completed"})
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }     
//invoke the API to get the result of the input for searching.
  searchProject(){
    let myInit = {  
      headers: {}, 
      response: true, 
      queryStringParameters: {  
        proname: this.state.searchText} }
    return API.get("projectslist",`/projectslist/personal`,myInit)
  }

//lisk the API to get the list according to the status 
  getPendingList(status){
    console.log("get the pending list:", status)
    return API.get("projectslist", "/projectslist/pending");
  }
  getActiveList(status){
    console.log("get the active list:", status)
    return API.get("projectslist", "/projectslist/active");
  }
  getCompletedList(status){
    console.log("get the completed list:", status)
    return API.get("projectslist", "/projectslist/completed");
  }

  //render function to render the websites part in the screen. 
  renderProjectsList(projects) {
    return [{}].concat(projects).map(
      (project, i) =>
        i !== 0
          ? <LinkContainer
              key={project.projectid}
              to={`/projects/${project.projectid}`}
            >
              <ListGroupItem header={project.pname}>
                {"Created: " + new Date(project.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/projects/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a New Project for Company
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  //when the i ==0, create the item which is the "create a new project"
  renderSearch(){
    return(
      <div>
      <Form className="searchForm">
      <ControlLabel>Input the project name</ControlLabel>
      <Form inline  onSubmit={this.handleSubmitSearch}> 
      <FormGroup controlId="searchText">
              <FormControl
                type="text"
                onChange={this.handleChange}
                value={this.state.searchText}
                // componentClass="textarea"
              />
      </FormGroup>{"  "}
      <LoaderButton
              bsStyle="primary"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Search"
              loadingText="Saving…"
            />
      </Form>
      </Form>
      {this.renderSearchResult(this.state.searchResult)}
      </div>)
  }

  renderSearchResult(searchResult){
    // console.log("from the render",searchResult)
    return [{}].concat(searchResult).map(
      (result, i) =>
        i !== 0
          ? <LinkContainer
              key={result.projectid}
              to={`/project/${result.projectid}`}   
            >   
              <ListGroupItem header={result.pname}>
              {"manager:"+result.pmanager+" "}
              {"Created: " + new Date(result.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <ListGroupItem key="head">  
                <h4>
                  Search Result
                </h4>
            </ListGroupItem>)

  }

  renderListByStatus(){
    return(
      <div>
      <ButtonToolbar className="listByStatus">
      <Form onSubmit={this.handlePendingList}>
      <Button type="submit" bsStyle="warning" bsSize="large">Pending</Button>

      </Form>
      <Form onSubmit={this.handleActiveList}>
      <Button type="submit" bsStyle="success" bsSize="large">Active</Button>
      
      </Form>
      <Form onSubmit={this.handleCompletedList}>
      <Button type="submit" bsStyle="default" bsSize="large">Completed</Button>
      
      </Form>
      </ButtonToolbar>
      {this.renderListResult(this.state.listResult)}
      </div>
      )
  }
  //render the list by status, pending active and the completed.
  renderListResult(list){
    return [{}].concat(list).map(
      (result, i) =>
        i !== 0
          ? <LinkContainer
              key={result.projectid}
              to={`/project/${result.projectid}`}   
            >   
              <ListGroupItem header={result.pname}>
              {"manager:"+result.pmanager+" "}
              {"Created: " + new Date(result.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <ListGroupItem key="head">  
                <h4>
                  List -- {this.state.status}
                </h4>
            </ListGroupItem>)
  }


  renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Projects List</PageHeader>
        <ListGroup>
        <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Search">  
          {this.renderSearch()}
          </Tab>
          <Tab eventKey={2} title="Projects List">
            {!this.state.isLoading && this.renderProjectsList(this.state.project)} 
          </Tab>
          <Tab eventKey={3} title="List by Status">
           {this.renderListByStatus()}
          </Tab>
        </Tabs>
          
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
