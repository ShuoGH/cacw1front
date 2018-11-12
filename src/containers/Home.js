import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {

  renderLander() {
    return (
      <div className="lander">
        <h1>App</h1>
        <p>My mess code.</p>
        <p> this will show when you log out</p>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderLander()}   
      </div>
    );
  }
}
//1. this main page should be more pretty. add the Data.now() and some other functions showed on this page. ---11:16 12-11-2018

