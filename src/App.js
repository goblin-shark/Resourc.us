import React, { useState, useLayoutEffect, useEffect, useContext } from "react";

// import router
import { Route, Link, useLocation, BrowserRouter, Switch, Redirect } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup"
import Teams from "./pages/Teams";
import MyTeams from "./pages/MyTeams";
import TeamDetailPage from "./components/TeamDetailPage"

// import components
import Navbars from "./components/Navbar";
import CreateTeam from "./components/CreateTeam";
import CreateResource from "./components/CreateResource";
import ResourceCard from "./components/ResourceCard"
import Search from "./components/Search";
import FilteredResults from "./components/FilteredResults";
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { isLogin } from './components/utility';
import { UserContext } from './components/UserContext';

const App = () => {
  const location = useLocation().pathname;
  const [button, setButton] = useState(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);
  const [showResults, setShowResults] = React.useState(false)
  const [results, setSearchData] = React.useState([])
  const { user, logout } = useContext(UserContext)

  useLayoutEffect(() => {
    if (location === '/teams' | '/searchResults') {
      setButton(<Link to='/CreateTeam' className="btn btn-success">Create Team</Link>);
    } else if (location === '/CreateTeam' || location === '/CreateResource' || location === '/login' || location === '/signup') {
      setButton('');
    } else {
      setButton(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);
    }
  }, [location, user]);

  return (
    <BrowserRouter>
      <div className="outerContainer">
        <Navbars />
        <div className="innerContainer">
          <header className="mainHeader">
            <ul>
              <li className="primary-action">{button}</li>
              <Search setShowResults={setShowResults} setSearchData={setSearchData} />
              {!isLogin() ? <li><Link to='/login'>Login</Link></li> : <li>Welcome, {user.user.firstname} </li>}
              {!isLogin() ? null : <li><Link to='/' className="btn btn-secondary" onClick={logout}>Logout</Link></li>}
              {!isLogin() ? <li><Link to='/signup'>Signup</Link></li> : <li></li>}
            </ul>
          </header>
          {showResults && <Redirect to={{ pathname: '/searchResults', state: { search: results } }} />}
          <Switch>
            <PublicRoute restricted={false} component={Home} path="/" exact />
            <Route path={"/teams/:id"} component={TeamDetailPage}></Route>
            <Route path="/teams" exact component={Teams}></Route>
            <Route path="/myTeams" exact component={MyTeams}></Route>
            <PrivateRoute component={CreateResource} path="/CreateResource" exact />
            <PrivateRoute component={CreateTeam} path="/CreateTeam" exact />
            <Route path="/signup">{<SignupPage />}</Route>
            <Route path="/login">{<LoginPage />}</Route>
            <Route path="/ResourceCard">{<ResourceCard />}</Route>
            <Route path="/searchResults" exact component={FilteredResults}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
