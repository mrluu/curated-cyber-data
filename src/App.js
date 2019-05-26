import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from "./Home";
import ViewVulns from "./ViewVulns";
import AddVulns from "./AddVulns";
import "./App.css"

const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <header className="App-header">
              <span className="left">
                <Link className="header-link" to="/home/">Home</Link>
                <div className="divider"/>
                <Link className="header-link" to="/view_vulns/">View Vulns</Link>
                <div className="divider"/>
                <Link className="header-link" to="/add_vulns/">Add Vulns</Link>
              </span>
          </header>
          <div>
            <Route path="/home/" component={Home} />
            <Route path="/view_vulns" component={ViewVulns} />
            <Route path="/add_vulns" component={AddVulns} />
            <Route path="/" exact component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
