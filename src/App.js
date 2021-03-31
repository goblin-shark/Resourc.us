
import React from "react";
import { hot } from 'react-hot-loader/root';
import { Switch, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/home';
import { SignupPage } from './pages/signup';
import { LoginPage } from './pages/login';
import { AllTeamsPage } from './pages/teams';

function App() {  
  return (
    <div className="App">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/teams">Teams</Link>
          </li>
        </ul>
      </nav>
      {/* define the routes of the application */}
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/signup" component={SignupPage}></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/teams" component={AllTeamsPage}></Route>
        {/* 
        <Route path="/teams/create" component={}></Route>
        <Route path="/teams/edit/:id" component={}></Route>
        <Route path="/teams/:id" component={}></Route> 
        <Route path="/users/:id" component={}></Route> 
        */}
      </Switch>
    </div>
  );
}

export default hot(App);
