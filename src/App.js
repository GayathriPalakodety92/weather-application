import React from "react";
import { Router, Route } from "react-router-dom";

import { createBrowserHistory as createHistory } from "history";

import "./App.css";
import Location from "./View/location";
const history = createHistory();
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/" exact component={(props) => <Location />} />
      </Router>
    </div>
  );
}
export default App;
