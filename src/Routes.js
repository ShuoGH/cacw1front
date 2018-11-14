import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewProject from "./containers/NewProject";
import Projects from "./containers/Projects";
import ProjectsList from "./containers/ProjectsList";
import PersonalProjects from "./containers/PersonalProjects";
import Profile from "./containers/Profile";
import StaffList from "./containers/StaffList";
import User from "./containers/User";
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

    <AuthenticatedRoute path="/staff/:id" exact component={User} props={childProps} />
    <AuthenticatedRoute path="/stafflist" exact component={StaffList} props={childProps} />

    <AuthenticatedRoute path="/profile" exact component={Profile} props={childProps} />
    <AuthenticatedRoute path="/personalprojects" exact component={PersonalProjects} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;

  //staff/update there are many bugs---15:22 14-11-2018