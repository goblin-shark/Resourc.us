import React, { useState, useEffect } from "react";
import ResourceCard from "./ResourceCard"
// import { Link } from 'react-router-dom';

function TeamDetailPage({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;

  // set Team info in state
  const [team, setTeam] = useState([]);

  // set Team Resources in state
  const [teamResources, setTeamResources] = useState([]);

  useEffect(() => {
    // TO DO LATER: change to use teamController.findTeam
    // GET team details by ID
    fetch("http://localhost:3000/teams/list")
      .then(response => response.json())
      .then(data => {
        const team = data.filter(t => t._id === id)
        // console.log('teams data:', data)
        // console.log('individual team data:', team)
        setTeam(team)
      })
      .then(() => {
        // GET resources that belong to current team by team ID
        fetch("http://localhost:3000/resource/listAll")
          .then(response => response.json())
          .then(data => {
            const currentResources = data.filter(r => r.teamId === id)
            // console.log("resources: ", data)
            setTeamResources(currentResources)
          })
      })
      .catch(err => {
        console.log('GET FAILED', err);
      })
  }, [])

  return (
    <div class="container teamContainer">
      <div className="teamCard teamHero">{team.map(t => <div key={t._id}>
        <header>
          <div className="mask"></div>
          <h1>{t.name}</h1>
        </header>
        <section>
          <div className="meta">
            <div>{t.category}</div>
          </div>
          <article><p>{t.description}</p></article>
        </section>

        <ResourceCard teamId={t._id}></ResourceCard>
      </div>)}</div>
    </div>
  );
}


export default TeamDetailPage;