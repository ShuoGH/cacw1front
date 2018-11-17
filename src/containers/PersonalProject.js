import React, { Component } from "react";
import { API } from "aws-amplify";
import { form,ListGroupItem, FormGroup, FormControl, ButtonToolbar, ControlLabel,Form} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./PersonalProject.css";
import { LinkContainer } from "react-router-bootstrap";

export default class PersonalProjects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: null,
      isDeleting: null,
      user: null,
      pname:"",
      personalproject:[],

      isLoading:true,
    };
  }

  async componentWillMount() {
    try {
      const user = await this.getProfile();
      // console.log("bug code",user);
      const { pname } = user;
      this.setState({
        user,
        pname,
      });  
      console.log("print the state user:",this.state.pname) 
      const personalproject =await this.getPersonalProject()
      // this.setState({ personalproject })
      this.setState({isLoading:false, personalproject: personalproject.data})
      //this is important, so that the personal project can pass to the personal project state.
      console.log(personalproject)  
    } catch (e) {
      alert(e);
    }
  }

  getProfile() {
     return API.get("profile", `/profile/${this.props.match.params.id}`);
     //this will fetch the according project.
  }

//get the infomation of the project which the user belongs to.
  getPersonalProject(){
  	let myInit = {  
  		headers: {}, 
    	response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    	queryStringParameters: {  // OPTIONAL
        proname: this.state.pname} }
  	return API.get("projectslist",`/projectslist/personal`,myInit)
  }

  //use the concat and map function/
  renderProject(personalproject){
    console.log(personalproject, this.state.personalproject)
    return [{}].concat(personalproject).map(
      (project,i)=> 
        i!=0
        ?<ListGroupItem key={project.projectid}>
          <h1>{""+project.pname}</h1>
          <Form inline>
          <FormGroup>
          <ControlLabel>Manager:</ControlLabel>{" "}
            {project.pmanager}
          </FormGroup>{" "}
          <FormGroup>
          <ControlLabel>Status:</ControlLabel>{" "}              
            {project.pstatus} 
          </FormGroup> 
          </Form>
          {"Created: " + new Date(project.createdAt).toLocaleString()}
          </ListGroupItem>
        :<ListGroupItem key="head">
          <h1> Your Projects</h1>
          </ListGroupItem>)
  }

  render() {
    return (
      <div className="Projects">
      {!this.state.isLoading&&this.renderProject(this.state.personalproject)}
      </div>
    );
  }
}

//use the && can make it render the component only after successful call.