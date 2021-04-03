import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import router
import { BrowserRouter as Router, Route } from "react-router-dom";

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


function App() {
  return (
    <div className="App">
      <Router>
        <h1>Resource Sharing App (placeholder title)</h1>

        <Navbars />
        <Route path="/" exact>{<Home></Home>}</Route>
        <Route path="/teams">{<Teams></Teams>}</Route>
        <Route path="/CreateResource">{<CreateResource></CreateResource>}</Route>
        <Route path="/CreateTeam">{<CreateTeam></CreateTeam>}</Route>
        <Route path="/signup">{<SignupPage></SignupPage>}</Route>
        <Route path="/login">{<LoginPage></LoginPage>}</Route>
        <Route path="/ResourceCard">{<ResourceCard></ResourceCard>}</Route>
        <Route path={"/teams/:id"}>{<TeamDetailPage></TeamDetailPage>}</Route>
      </Router>
    </div>
  );
}
export default App;


// Other Routes
{/* <div className="App"> */}
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
  {/* define the routes of the application */}
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
