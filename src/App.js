import React, { Component } from 'react';
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Home from "./Home";
import {Vulnerabilities} from "./Vulnerabilities";
import Configurations from "./Configurations";
import Threats from "./Threats"
import "./App.css"

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <header className="App-header">
              <span className="left">
                <Link className="header-link" to="/home/">Home</Link>
                <div className="divider"/>
                <Link className="header-link" to="/vulns/">Vulnerabilities</Link>
                <div className="divider"/>
                <Link className="header-link" to="/configs/">Configurations</Link>
                <div className="divider"/>
                <Link className="header-link" to="/threats/">Threats</Link>
              </span>
          </header>
          <div>
            <Route path="/home/" component={Home} />
            <Route path="/vulns" component={Vulnerabilities} />
            <Route path="/configs" component={Configurations} />
            <Route path="/threats" component={Threats} />
            <Route path="/" exact component={Home} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
