import React from 'react';  
import ReactDOM from 'react-dom';   //use to render the components. and it's different with DOM of browser
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";   //this is adding one
import Amplify from "aws-amplify"
import config from "./config"

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "projects",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});
//add the amplify to connect the backend 
//the auth refers to the Cognito
//the storage refers to the S3 bucket
//the API refers to the API gateway.  
//my api is "projects"， this is my single api...

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
