import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import DebtForm from '../DebtForm/DebtForm';
import Dashboard from '../DebtDashboard/DebtDashboard';
import LoginPage from '../LoginPage/LoginPage'; 

import './App.css';

function App() {
  return (
    <div>
    <Router>
      <Switch>
      <Route path="/add-debts" component ={DebtForm}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route exact path="/" component={LoginPage}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
