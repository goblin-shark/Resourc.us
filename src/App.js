import React, { useState, useLayoutEffect, useEffect} from "react";

// import router
import { Route, Link, useLocation, Redirect} from "react-router-dom";

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
import Search from "./components/Search"
import FilteredResults from "./components/FilteredResults";


function App() {
  const location = useLocation().pathname;
  const [button, setButton] = useState(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);
  const [showResults, setShowResults] = React.useState(false)
  const [results, setSearchData] = React.useState([])


  useLayoutEffect(() => {
		if (location === '/teams' | '/searchResults') {
      setButton(<Link to='/CreateTeam' className="btn btn-success">Create Team</Link>);
    } else if (location === '/CreateTeam' || location === '/CreateResource' || location === '/login' || location === '/signup') {
      setButton('');
    } else {
      setButton(<Link to='/CreateResource' className="btn btn-success">Create Resource</Link>);
    }
  }, [location]);


  return (
    <div className="outerContainer">
      <Navbars />
      <div className="innerContainer">
        <header className="mainHeader">
        <ul>
          <li className="primary-action">{button}</li>
          <Search setShowResults= {setShowResults} setSearchData = {setSearchData}/>
          <li><Link to='/login'>Login</Link></li>
          <li><Link to='/signup'>Signup</Link></li>
        </ul>
        </header>
        { showResults && <Redirect to={{ pathname: '/searchResults',  state: { search: results }}}/>}
        <Route path="/" exact>{<Home></Home>}</Route>
        <Route path={"/teams/:id"} component={TeamDetailPage}></Route>
        <Route path="/teams" exact component={Teams}></Route>
        <Route path="/CreateResource">{<CreateResource></CreateResource>}</Route>
        <Route path="/CreateTeam">{<CreateTeam></CreateTeam>}</Route>
        <Route path="/signup">{<SignupPage></SignupPage>}</Route>
        <Route path="/login">{<LoginPage></LoginPage>}</Route>
        <Route path="/ResourceCard">{<ResourceCard></ResourceCard>}</Route>
        <Route path="/searchResults" exact component= {FilteredResults}></Route>
      </div>
    </div>
  );
}
export default App;
//use route???
// <Route path="/filteredResult">{<FilteredResults ></FilteredResults>}</Route>
// Other Routes


{/* <div className="App"> */ }
// <nav className="navbar">
//   <ul className="navbar-nav">
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/signup">Sign Up</Link>
//     </li>
//     <li>
//       <Link to="/login">Log In</Link>
//     </li>
//     <li>
//       <Link to="/teams">Teams</Link>
//     </li>
//   </ul>
// </nav>
{/* define the routes of the application */ }
  // <Switch>
  //   <Route exact path="/" component={HomePage}></Route>
  //   <Route exact path="/signup" component={SignupPage}></Route>
  //   <Route exact path="/login" component={LoginPage}></Route>
  //   <Route exact path="/teams" component={AllTeamsPage}></Route>
  //   {/* 
  //   <Route path="/teams/create" component={}></Route>
  //   <Route path="/teams/edit/:id" component={}></Route>
  //   <Route path="/teams/:id" component={}></Route> 
  //   <Route path="/users/:id" component={}></Route> 
  //   */}
  // </Switch>
// </div>
