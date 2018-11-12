import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
//import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewProject from "./containers/NewProject";
import Projects from "./containers/Projects";
import ProjectsList from "./containers/ProjectsList";
import NewProfile from "./containers/NewProfile"
import Staff from "./containers/Staff"
import Profile from "./containers/Profile"
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <AuthenticatedRoute path="/projects/new" exact component={NewProject} props={childProps} />
    <AuthenticatedRoute path="/projects/:id" exact component={Projects} props={childProps} />
    <AuthenticatedRoute path="/projectslist" exact component={ProjectsList} props={childProps} />
    <AuthenticatedRoute path="/profile/new" exact component={NewProfile} props={childProps} />
    <AuthenticatedRoute path="/profile/update" exact component={Profile} props={childProps} />
    <AuthenticatedRoute path="/stafflist" exact component={Staff} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;