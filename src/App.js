import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import TransactionsPage from "./components/TransactionsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/transactions" component={TransactionsPage} />
      </Switch>
    </Router>
  );
}

export default App;
