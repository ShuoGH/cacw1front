import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";

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
    this.userHasAuthenticated(true);
  }
  catch(e) {
    if (e !== 'No current user') {
      alert(e);
    }
  }

  this.setState({ isAuthenticating: false });
}
//this is used to update the flag 
userHasAuthenticated = authenticated => {
  this.setState({ isAuthenticated: authenticated });
}
// handleLogout = event => {
//   this.userHasAuthenticated(false);
// }
//this can't make the the app keep log out. so it change to this code below 
handleLogout = async event => {
  await Auth.signOut();

  this.userHasAuthenticated(false);
}
//this can clear the session on log out

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
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
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

export default App;