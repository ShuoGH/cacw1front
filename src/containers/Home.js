import React, { Component } from "react";
import { API } from "aws-amplify";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      username:"",
      email: "",
      tel:"",
      gender:"",
      department:"",
      skill:"",
      interest:"",
      pname:"",
      ismanager:"",
      isFirst: null,
      //isFirst: indicate whether the user is a new user who haven't register a new username.
    };
    this.checkIsAdmin=this.checkIsAdmin.bind(this);
  }

  async componentWillMount() {
    try {
      //when you log in, get the user info first.
      //if the user is the first time to log in: the API can't fetch the info of him
      //and then, he should go to init his infomation first
      console.log("going to fetch the user info from the dynamoDB.")
      //test whether the can get the current user info
      const user = await this.getProfile();
      const { username,email,tel,gender,department,skill,interest,pname,ismanager } = user;
      this.setState({
        user,
        username,
        email,
        tel,
        gender,
        department,
        skill,
        interest,
        pname,
        ismanager,
      });
      //when get the info from the user, then change the flag to the false.
      //if the user info is already in the dynamoDB, then check whether it's admin.
      this.props.setUserName(username) 
      //set the username, and then it show in the nav bar.
      this.checkIsAdmin()
      console.log(this.props)
      this.setState({isFirst:false})
      console.log("log from the success")
    } catch (e) {
      //when failed to the get the info, change the flag to the true. it's the user's first time to log into the system.
      this.setState({isFirst:true})
      // console.log("log from the failure",this.state,this.props)
    }
  }

  getProfile() {
    return API.get("profile", `/profile/${this.props.match.params.id}`);
  }

  //check the this.state.username, if it equal to the "admin", then change the flag "isadmin" to TRUE.
  //the "isadmin" flag changed, then the component in each kind of user will change.
  checkIsAdmin(){
    this.state.username==="admin"
    ?this.props.userIsAdmin(true)
    :this.props.userIsAdmin(false)
    // console.log("whether it's admin:",this.props.isAdmin)
  }

  //write a function check whether the user is the first time to log in.
  //if it's the first time, then the user should fill the form of his infomation. which will be stored into the dynamoDB.
  //when the isFirst flag is true, then render the profile form to fill.

  //----------there will be a lot of code here to let the user to write the profile.---17:28 14-11-2018
  renderFillProfile(){
    return(
        <div className="heihei">
        <h1> Write your Profile here.
        and there are some buttons here. </h1>
      </div>
      );
  }
  //when the isFirst flag is false, then render the lander part to welcome.
  renderLander() {
    return (
      <div className="lander">
      <h1>welcome {this.state.username} !</h1>
      <h1>this is going to use the breadcum nav bar. 
      and there are also a lot of code here.</h1>
      </div>
    );
  }

  render() {
    console.log("render the real DOM");
    return (
      <div className="Home">
      {this.state.isFirst === true
        ? this.renderFillProfile()
        : this.renderLander() 
      }
      </div>
    );
  }
}
//1. this main page should be more pretty. add the Data.now() and some other functions showed on this page. ---11:16 12-11-2018

