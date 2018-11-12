import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Profile.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      project: []
    };
  }


  render() {
    return (
      <div className="profile">
        <p>this page is going to be used to update the profile of staff</p>
      </div>
    );
  }
}

