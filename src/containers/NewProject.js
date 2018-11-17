import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar,ControlLabel,Form } from "react-bootstrap";
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

      allStaff:[],
    };
  }
  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const allStaff = await this.getAllStaff();
      this.setState({ allStaff });
      console.log("get all staff",allStaff)
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

//validate the project name, is should be bigger than 0. 
  validateForm() {
    return this.state.pname.length > 0;
  }
//handle the changes when you change the input.
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
    // console.log(event,event.target.id,event.target.value);
    // console.log("ha?",this.state.pmanager)
  }
//handle the submit, to invoke the API and do action on the database.
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      console.log(this.state)
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

  getAllStaff(){
    return API.get("staff","/staff");
  }
  //Create the options dynamically based on the projects list, to allocate the project to a user.
  createSelectItems(allStaff) {
      let items = [];         
      for (let i = 0; i < allStaff.length; i++) {      
      console.log("in the createselectitems",allStaff[i].username) 
          items.push(<option key={i} value={allStaff[i].username}>{allStaff[i].username}</option>);   
            // console.log(allProject[i])
      }
       return items;
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
          <ControlLabel>Project Manager:</ControlLabel>{" "}
          <FormControl 
            value={this.state.pmanager}
            componentClass="select" 
            onChange={this.handleChange}>
            <option value="">..</option>
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
              <option value="">..</option>
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