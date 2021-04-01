import React from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import router
import { BrowserRouter as Router, Route } from "react-router-dom";

// import pages
import Home from "./pages/Home";
import LoginPage from "./pages/Login";

// import components
import Navbars from "./components/Navbar";

import CreateTeam from "./components/CreateTeam";
import CreateResource from "./components/CreateResource";
import Teams from "./components/Teams";

function App() {
  return (
    <Router>
      <h1>Resource Sharing App (placeholder title)</h1>

      <Navbars />
      <Route path="/" exact>{<Home></Home>}</Route>
      <Route path="/Teams">{<Teams></Teams>}</Route>
      <Route path="/CreateResource">{<CreateResource></CreateResource>}</Route>
      <Route path="/CreateTeam">{<CreateTeam></CreateTeam>}</Route>
      <Route path="/login">{<LoginPage></LoginPage>}</Route>
    </Router>
  );
}
export default App;
