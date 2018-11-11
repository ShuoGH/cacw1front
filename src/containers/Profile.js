import React, { Component } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const notes = await this.notes();
      this.setState({ notes });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

//to get the profile of a staff
  getProfile() {
    return API.get("staff", `/staff/${this.props.match.params.id}`);
  }


  renderProfile() {
    return (
      <div className="Profile">
        <PageHeader>Your Profile</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderProfileList(this.state.notes)} 
        </ListGroup>
      </div>
    );
  }
  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()}   
      </div>
    );
  }
  //if is authenticated, render notes list, else then render the lander 
}

