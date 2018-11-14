import React, { Component } from "react";
import { API } from "aws-amplify";
import { FormGroup, FormControl, ButtonToolbar, ControlLabel} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
// import config from "../config";
import "./PersonalProjects.css";
import { LinkContainer } from "react-router-bootstrap";

export default class PersonalProjects extends Component {

  render() {
    return (
      <div className="Projects">
      <h1>this is going to show the personal projects</h1>
      </div>
    );
  }
}
