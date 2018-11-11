import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
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
      isAuthenticating: true
      //first initializes the isAuthenticated flag in the app's flag 
    };
  }
  async componentDidMount() {
    try {
      await Auth.currentSession();
      console.log("checking the session")
      this.userHasAuthenticated(true);
      console.log("checked the session")
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }
//this is used to update the flag which is used to indicate whether user has logged in 
userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
}

handleLogout = async event => {
  await Auth.signOut();

  this.userHasAuthenticated(false);
  this.props.history.push("/");
}
//this can clear the session on log out
//and return to the home page of the application 

render() {
  const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
  };
  return (
    <div className="App container">
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
              <NavItem onClick={this.handleLogout}>Logout</NavItem>
              <LinkContainer to="/">
              <NavItem>Projects</NavItem>
              </LinkContainer>
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
      <Routes childProps={childProps} />
    </div>
  );
}
}
export default withRouter(App);
// ? : ----the expression of "if then else" 
//1. going to create a new page of listing the profile of users.
//2. can handle the problem of can't loading the prjects list after refreshing. so cancel the dropdown button. 
    // <NavDropdown title="User" id="nav-dropdown">
    // <MenuItem eventkey="1" href="/">Profile</MenuItem>
    // <MenuItem eventkey="2" href="/">Projects</MenuItem>
    // </NavDropdown>
