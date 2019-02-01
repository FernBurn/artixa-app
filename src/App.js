import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignInScreen from './components/SignInScreen';
import Fokusz from './components/Fokusz';

const App = ()=> {
  return (
    <Router>
       <div>
         <Route exact path ="/" component={SignInScreen} />
         <Route exact path ="/Fokusz" component={Fokusz} />
       </div>
    </Router>
  );
};

export default App;
