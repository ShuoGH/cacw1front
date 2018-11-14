import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem, NavDropdown,MenuItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

//use class to create a react component.
//it's the sub class of react.component. we also define the render() in the last.
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      isAdmin:false,
      isManager:false,
      username:"USER",
      //define the isadmin flag to record the flag whether the user is admin.
      //define the isManager flag to record the state whether the user is manager of one project.
    };
    this.userIsAdmin=this.userIsAdmin.bind(this);
  }
  async componentDidMount() {
    try {
      await Auth.currentSession();
      // console.log("checking the session")
      this.userHasAuthenticated(true);
      // console.log("checked the session")
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }
  //this is used to update the flag which is used to indicate whether user has logged in.
  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  userIsAdmin = adminship => {
      this.setState({
        isAdmin: adminship
      });
    }

  setUserName = theusername =>{
    this.setState({
      username: theusername
    })
  }
  
  

handleLogout = async event => {
  await Auth.signOut();

  this.userHasAuthenticated(false);
  this.props.history.push("/");
  this.userIsAdmin(false)
  this.setUserName("USER")
}
//this can clear the session on log out
//and return to the home page of the application 

//this is the admin edition, when the isadmin flag is true.
renderAdminEdition(){
  return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Management System</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <Fragment>
              <NavDropdown title={this.state.username} id="Navdropdown">
              <LinkContainer exact to="/" activeClassName=""> 
              <MenuItem eventkey="1">Main Page</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/profile" activeClassName="">
              <MenuItem eventkey="2">Profile(admin)</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/projectslist" activeClassName="">
              <MenuItem eventkey="3">Projects List</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/stafflist" activeClassName="">
              <MenuItem eventkey="4">Staff List</MenuItem>
              </LinkContainer>

              <MenuItem divider />
              <LinkContainer exact to="/" activeClassName="">
              <MenuItem eventkey="5" onClick={this.handleLogout}>Logout</MenuItem>
              </LinkContainer>
              </NavDropdown>
                </Fragment>
              : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
    </Fragment>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

  );  
}

//this is the ordinary staff edition. which will show up when the user is a staff.
renderStaffEdition(){
  return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Management System</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.state.isAuthenticated
              ? <Fragment>
              <NavDropdown title={this.state.username} id="Navdropdown">
              <LinkContainer exact to="/" activeClassName=""> 
              <MenuItem eventkey="1">Main Page</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/profile" activeClassName="">
              <MenuItem eventkey="2">User Profile</MenuItem>
              </LinkContainer>
              <LinkContainer exact to="/personalprojects" activeClassName="">
              <MenuItem eventkey="3">Personal Project</MenuItem>
              </LinkContainer>

              <MenuItem divider />
              <LinkContainer exact to="/" activeClassName="">
              <MenuItem eventkey="4" onClick={this.handleLogout}>Logout</MenuItem>
              </LinkContainer>
              </NavDropdown>
                </Fragment>
              : <Fragment>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
    </Fragment>
}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
  );  
}

//Two editions, according whether the user is admin, render the according part.
render() {
//this is what will be used in the child class, super() and the this.props
  const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      isAdmin:this.state.isAdmin,   //this is going to pass to the child components.** can't miss .state.
      userIsAdmin:this.userIsAdmin,

      username:this.state.username,  //this is going to show in the navbar.
      setUserName:this.setUserName,

      isManager:this.state.isManager, //store the info of user.
  };
  return (
    <div className="App container">
      {this.state.isAdmin===true
        ?this.renderAdminEdition()
        :this.renderStaffEdition()}
      <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
//expression: ? : is the expression of "if then else" 
//1. use the dropdown menu to list the option which user can choose. see the profile and the projects, and can choose to logout 
//2. use admin to develop the frontend.---10:40 12-11-2018
//3. add the staff list page for the app ---10:40 12-11-2018
