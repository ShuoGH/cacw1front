import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar, ControlLabel,Form} from "react-bootstrap";
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
      pname: "",
      pmanager:"",
      pstatus:"",

      allStaff:[],
    };
  }

  async componentWillMount() {
    try {
      const project = await this.getProject();
      // console.log(project);
      const { pname,pmanager,pstatus } = project;

      const allStaff = await this.getAllStaff();
      this.setState({ allStaff });
      
      this.setState({
        project,
        pname,
        pmanager,
        pstatus,
      });
      // console.log(this.state)
    } catch (e) {
      alert(e);
    }
  }

  getProject() {
    return API.get("projects", `/projects/${this.props.match.params.id}`);
  }
  validateForm() {
    return this.state.pname.length > 0;
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
      this.props.history.push("/projectslist");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }

  getAllStaff(){
    return API.get("staff","/staff");
  }
  //Create the options dynamically based on the projects list, to allocate the project to a user.
  createSelectItems(allStaff) {
      let items = [];         
      for (let i = 0; i < allStaff.length; i++) {      
      // console.log("in the createselectitems",allStaff[i].username) 
          items.push(<option key={i} value={allStaff[i].username}>{allStaff[i].username}</option>);   
            // console.log(allProject[i])
      }
       return items;
    }  

  render() {
    return (
      <div className="Projects">
        {this.state.project &&
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
          <ControlLabel>Project Manager:</ControlLabel>{" "}
          <FormControl 
            value={this.state.pmanager}
            componentClass="select" 
            onChange={this.handleChange}>
               {this.createSelectItems(this.state.allStaff)}
          </FormControl>
           </FormGroup>{" "}
          <Form inline>
          <FormGroup controlId="pstatus">
          <ControlLabel>status:</ControlLabel>{" "}
            <FormControl
                onChange={this.handleChange}
                value={this.state.pstatus}
                componentClass="select">
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              </FormControl>
          </FormGroup>
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
            <LoaderButton
              
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
            <LinkContainer to="/projectslist">
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