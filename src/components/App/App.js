import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import DebtForm from '../DebtForm/DebtForm'
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/debt" component ={DebtForm}/>
    </Router>
  );
}

export default App;
