import React from "react";
import Alert from "react-s-alert";
import { Switch, Route, Redirect } from "react-router-dom";
import NotificationsWrapper from 'components/Notifications/NotificationsWrapper.js';

import Layout from "components/Layout/Layout";
import APIProvider from "utils/APIProvider";


import {
  Login,
  Setup,
  Search,
  Home,
  Article,
  Admin,
  NotFoundError
} from "./MainScenes";


// bunch of custom styles that are needed globally
import "./bootstrap.css";
import "./style.css";

// TODO refactor the Auth logic into a HOC
class Main extends React.Component {
  componentWillMount() {
    // Hack to move away from here if going to setup
    if (!this.props.location.pathname.includes("setup")) {
      // TODO Make this check stronger

      const token = window.localStorage.getItem("userToken");

      if (!token) return this.props.history.push("/login");

      // TODO Setup a separate "verifyJWT" route to kick the user out to the login page
      APIProvider.get("articles")
      // .then(response => {
      //   if (this.props.history.pathname === "/") {
      //     this.props.history.push("/home");
      //   }
      // })
      .catch(err => {
        if (err.code === "B101") {
          window.localStorage.setItem("userToken", "");
  -       this.props.history.push("/login");
        }
      });
    }
  }

  handleLogout = () => {
    window.localStorage.setItem("userToken", "");
    Alert.success("You've been successfully logged out");
    this.props.history.push("/login");
  };

  render() {
    const headerProps = {
      isAdmin: parseInt(window.localStorage.getItem("userId")) === 1,
      isLoggedIn: window.localStorage.getItem("userToken") ? true : false,
      handleLogoutClick: this.handleLogout
    };


    if (this.props.location.pathname === '/') {
      if (window.localStorage.getItem('userToken')) {
        return <Redirect to="/home" />
      } else {
        return <Redirect to="/login" />
      }
    }

    return (
      <div>
        <Layout {...headerProps}>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/article" component={Article} />
            <Route path="/admin" component={Admin} />
            <Route path="/search" component={Search} />
            <Route path="/setup" component={Setup} />
            <Route path="*" component={NotFoundError} />
          </Switch>
        </Layout>
        <NotificationsWrapper />
      </div>
    );
  }
}

export default Main;
