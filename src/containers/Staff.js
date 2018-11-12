import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Staff.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Staff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      profile: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const staff = await this.staff();
      this.setState({ staff });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  staff() {
    console.log("to get the api")
    return API.get("staff", "/staff");
  }
  //this is the url when you invoke your api. 
  renderStaffList(staff) {
    return [{}].concat(staff).map(
      (staff, i) =>
        i !== 0
          ? <LinkContainer
              key={staff.userid}
              to={`/stafflist`}   //should change it later 
            >
              <ListGroupItem header={staff.userid}>
                {"Created: " + new Date(staff.createdAt).toLocaleString()}
              </ListGroupItem>
            </LinkContainer>
          : <LinkContainer
              key="new"
              to="/profile/new"
            >
              <ListGroupItem>
                <h4>
                  <b>{"\uFF0B"}</b> Create a new user
                </h4>
              </ListGroupItem>
            </LinkContainer>
    );
  }
  //when the i ==0, create the item which is the "create a new project" ---18:18 09-11-2018
  renderStaff() {
    return (
      <div className="user">
        <PageHeader>Staff</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderStaffList(this.state.staff)} 
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Staff">
        {this.renderStaff()}   
      </div>
    );
  }
}
//1. edition v1.0 for the staff list page.  ---13:54 12-11-2018.. it cause bugs (need fix)
