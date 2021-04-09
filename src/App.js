import React, { useState, useLayoutEffect } from "react";

// import router
import { Route, Link, useLocation, BrowserRouter, Switch } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup"
import Teams from "./pages/Teams";
import TeamDetailPage from "./components/TeamDetailPage"

// import components
import Navbars from "./components/Navbar";
import CreateTeam from "./components/CreateTeam";
import CreateResource from "./components/CreateResource";
import ResourceCard from "./components/ResourceCard"
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


const App = () => {
  const location = useLocation().pathname;
  const [button, setButton] = useState(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);


  useLayoutEffect(() => {
    if (location === '/teams') {
      setButton(<Link to='/CreateTeam' className="btn btn-success">Create Team</Link>);
    } else if (location === '/CreateTeam' || location === '/CreateResource' || location === '/login' || location === '/signup') {
      setButton('');
    } else {
      setButton(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);
    }
  }, [location]);

  return (
    <BrowserRouter>
      <div className="outerContainer">
        <Navbars />
        <div className="innerContainer">
          <header className="mainHeader">
            <ul>
              <li className="primary-action">{button}</li>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Signup</Link></li>
            </ul>
          </header>
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <Route path={"/teams/:id"} component={TeamDetailPage}></Route>
            <Route path="/teams" exact component={Teams}></Route>
            <PrivateRoute component={CreateResource} path="/CreateResource" exact />
            <PrivateRoute component={CreateTeam} path="/CreateTeam" exact />
            <Route path="/signup">{<SignupPage />}</Route>
            <Route path="/login">{<LoginPage />}</Route>
            <Route path="/ResourceCard">{<ResourceCard />}</Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
