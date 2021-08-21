import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Movies from "./components/movies.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/movies" className="navbar-brand">
              Challenge Exercise
            </a>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/movies"]} component={Movies} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;