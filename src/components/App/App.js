import React from 'react';
import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import DebtForm from '../DebtForm/DebtForm';
import Dashboard from '../DebtDashboard/DebtDashboard';
import './App.css';

function App() {
  return (
    <div>
   hi
    <Router>
      <Switch>
      <Route exact path="/add-debts" component ={DebtForm}/>
      <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
