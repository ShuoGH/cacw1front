import React from 'react';  
import ReactDOM from 'react-dom';   
//use to render the components. and it's different with DOM of browser
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";   
import Amplify from "aws-amplify"
import config from "./config"
//this is the js rendering the index.html file. the entrance.

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  API: {
    endpoints: [
      {
        name: "projects",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "staff",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "profile",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "projectslist",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "sendemail",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});
//add the amplify to connect the backend 
//the auth refers to the Cognito
//the API refers to the API gateway.  
//there are two endpoints in my api gateway now.---17:19 13-11-2018
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
//render the root tag in the index.html 
);
//the App component is exported without router. 
serviceWorker.unregister();
