import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DebtForm from '../DebtForm/DebtForm';
import Dashboard from '../DebtDashboard/DebtDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/add-debts" component ={DebtForm}/>
      <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  );
}

export default App;
