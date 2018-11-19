import React, { Component } from "react";
import { FormGroup, FormControl,ButtonToolbar, ControlLabel, Jumbotron, Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton"; 
import { API} from "aws-amplify";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      username:"",
      email: "",
      tel:"",
      gender:" ",
      department:" ",
      skill:"",
      interest:"",
      pname:" ",
      ismanager:"",
      isFirst: null,
      //isFirst: indicate whether the user is a new user who haven't register a new username.
      toaddress:"",
      subject:"",
      text:"",
    }; 
    this.checkIsAdmin=this.checkIsAdmin.bind(this);
  }

  async componentWillMount() {
    try {
      //when you log in, get the user info first.
      //if the user is the first time to log in: the API can't fetch the info of him
      //and then, he should go to init his infomation first
      console.log("going to fetch the user info from the dynamoDB.")

      //test whether the can get the current user info
      const user = await this.getProfile();
      const { username,email,tel,gender,department,skill,interest,pname,ismanager } = user;
      this.setState({
        user,
        username,
        email,
        tel,
        gender,
        department,
        skill,
        interest,
        pname,
        ismanager,
      });
      //when get the info from the user, then change the flag to the false.
      //if the user info is already in the dynamoDB, then check whether it's admin.
      this.props.setUserName(username) 
      //set the username, and then it show in the nav bar.
      this.checkIsAdmin()
      // console.log(this.props)
      this.setState({isFirst:false})
      console.log("log from the success")
    //   this.setState({
    //   toaddress:"sa2y18@soton.ac.uk",
    //   subject:"shit code",
    //   text:"fuck you idot",
    // })

    } catch (e) {
      //when failed to the get the info, change the flag to the true. it's the user's first time to log into the system.
      this.setState({isFirst:true})
      // console.log("log from the failure",this.state,this.props)
    }
  }

  getProfile() {
    return API.get("profile", `/profile/${this.props.match.params.id}`);
  }

  //check the this.state.username, if it equal to the "admin", then change the flag "isadmin" to TRUE.
  //the "isadmin" flag changed, then the component in each kind of user will change.
  checkIsAdmin(){
    this.state.username==="admin"
    ?this.props.userIsAdmin(true)
    :this.props.userIsAdmin(false)
    // console.log("whether it's admin:",this.props.isAdmin)
  }

  validateUser() {
    return this.state.username.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  //write a function check whether the user is the first time to log in.
  //if it's the first time, then the user should fill the form of his infomation. which will be stored into the dynamoDB.
  //when the isFirst flag is true, then render the profile form to fill.
  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await this.createUser({
        username:this.state.username,
        email: this.state.email,
        tel:this.state.tel,
        gender: this.state.gender,
        department:this.state.department,
        skill:this.state.skill,
        interest:this.state.interest,
        pname: this.state.pname,
      });
      this.setState({isFirst:false})
      this.props.setUserName(this.state.username)
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  createUser(user) {
    return API.post("staff", "/staff", {
      body: user
    });
  }

  renderFillProfile(){
    return(
        <div className="newuser">
        <h1> Welcome to SHUO company! </h1>
        <h2> You need to complete your profile first. </h2>
          <form onSubmit={this.handleSubmit}>
          <Form inline>
          <FormGroup controlId="username">
          <ControlLabel>username:</ControlLabel>
            <FormControl
              type="text"
              onChange={this.handleChange}
              value={this.state.username}
            />
          </FormGroup>
            <FormGroup controlId="gender">
            <ControlLabel>Gender:</ControlLabel>{" "}
              <FormControl
                onChange={this.handleChange}
                value={this.state.gender}
                componentClass="select">
              <option value=" ">..</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              </FormControl>
            </FormGroup>
          </Form>
          <FormGroup controlId="email">
          <ControlLabel>Email</ControlLabel>
            <FormControl
            type="Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </FormGroup>
          <FormGroup controlId="tel">
          <ControlLabel>Phone number</ControlLabel>
            <FormControl
            type="text"
              onChange={this.handleChange}
              value={this.state.tel}
            />
          </FormGroup>
          <FormGroup controlId="skill">
            <ControlLabel>skill</ControlLabel>
            <FormControl
            type="text"
              onChange={this.handleChange}
              value={this.state.skill}
            />
            </FormGroup>
          <FormGroup controlId="interest">
          <ControlLabel>interest</ControlLabel>
            <FormControl
              onChange={this.handleChange}
              value={this.state.interest}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="department">
            <ControlLabel>department</ControlLabel>
            <FormControl
            type="text"
              onChange={this.handleChange}
              value={this.state.department}
            />
          </FormGroup>

          <ButtonToolbar className="pull-right">
          <LoaderButton
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateUser()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
          <LinkContainer to="/stafflist">
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
  //when the isFirst flag is false, then render the lander part to welcome.
  renderLander() {
    return (
      <div className="lander">
      <Jumbotron>
      <h1>welcome {this.state.username} !</h1>

      </Jumbotron>
      </div>
    );
  }

  render() {
    console.log("render the real DOM");
    return (
      <div className="Home">
      {this.state.isFirst === true
        ? this.renderFillProfile()
        : this.renderLander() 
      }
      </div>
    );
  }
}
//1. this main page should be more pretty. add the Data.now() and some other functions showed on this page. ---11:16 12-11-2018

