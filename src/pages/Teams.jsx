import React, { useState, useEffect } from "react";
import { Link, Route } from 'react-router-dom';

function Teams() {
  const [_teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teams/list").then(response => {

      return response.json(); //Parses to JSON
    }).then(data => {
      setTeams(data);
      // console.log(data); ENDLESS RUNNING BUG!?
    }).catch(err => {
      console.log('GET FAILED', err);
    })
  })

  return (
    <div className='container'>
      <h1>Teams Page</h1>
      {_teams.map(team =>
        <div className="teamCard" key={team.name}>
          <h1>{team.name}</h1>
          <h1>{team.image}</h1>
          <h1>{team.description}</h1>
          <h1>{team.category}</h1>

          {/* link to Team Detail Page */}
          <Link className="btn btn-primary" to={"/teams/" + team.name.toLowerCase().trim().replace(/\s/g, "-")}>View</Link>

          {/* link to join Team */}
          <Link className="btn btn-success" to="/#">Join</Link>
        </div>
      )}
    </div>
  )
}

export default Teams;

// const teamPageUrl = team.name