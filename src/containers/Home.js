import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Cloud</h1>
          <p>A simple infomation management system</p>
        </div>
      </div>
    );
  }
}
//render on time in response to the http request 