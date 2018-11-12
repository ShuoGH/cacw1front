import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Staff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      project: []
    };
  }


  render() {
    return (
      <div className="staff">
        <p>this is the page of the list of staff</p>
      </div>
    );
  }
}

//1. have changed the page of this file. make it the main page, remove the projects part to another url. ---11:08 12-11-2018