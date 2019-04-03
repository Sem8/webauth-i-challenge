import React, { Component } from "react";
import { Link, withRouter, BrowserRouter as Router } from "react-router-dom";

import "./App.css";

class App extends Component {
  state = {
    isLoading: true,
    token: "",
    signUpError: "",
    signInError: "",
    signInEmail: "",
    signInPassword: "",
    signUpEmail: "",
    signUpPassword: "",
    users: []
  };

  componentDidMount() {
    const token = localStorage.getItem(this.state.token);
    if (token) {
      fetch("/api/login" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    }
    fetch("/api/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push("/");
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    };

    if (!this.state.token) {
      return (
        <div>
          <p>Sign In</p>
          <p>Sign up</p>
        </div>
      );
    };

    return (
      <Router>
        <div className="App">
          <h1>Users</h1>
          <ul>
            {this.state.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
          <div>
            <Link to="/api/register">Register</Link>
          </div>

          <a href="" onClick={this.logOut}>
            Logout
          </a>
          <Link to="/">Home</Link>
          {localStorage.token ? (
            <Link to="/api/users">User</Link>
          ) : (
            <Link to="/api/login">Login</Link>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
