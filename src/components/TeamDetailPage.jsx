import React, {useState, useEffect} from "react";
// import { Link } from 'react-router-dom';

function TeamDetailPage ({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;
  // console.log( 'props:', props)
  // console.log( 'params:', params)
  // console.log( 'id:', id)

  // set Team info in state
  const [team, setTeam] = useState([]);

  // set Team Resources in state
  const [teamResources, setTeamResources] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
    .then(response => response.json())
    .then(data => {
      const team = data.filter(t => t._id === id)
      // console.log('teams data:', data)
      // console.log('individual team data:', team)
      setTeam(team)
    })
    .then(() => {
      fetch("http://localhost:3000/resource/listAll")
      .then(response => response.json())
      .then(data => {
        const currentResources = data.filter(r => r.teamId === id)
        console.log("resources: ", data)
        setTeamResources(currentResources)
      })
    })
    .catch(err => {
      console.log('GET FAILED', err);
    })
  }, [])

  return (
    <div>
      <p>Individual Team Page</p>
      <div>{team.map(t => <div key={t._id}>
        <p>Name: {t.name}</p>
        <p>Category: {t.category}</p>
        <p>Description: {t.description}</p>
      </div>)}</div>

      <div>
        <h1>Resources</h1>
        <div>{teamResources.map(resource => <div key={resource._id}>
          <div>{resource.title}</div>
          <div>{resource.link}</div>
          <div>{resource.votes}</div>
        </div>)}</div>
      </div>
    </div>
  );
}


export default TeamDetailPage;