import React, {useState, useEffect} from "react";
// import { Link } from 'react-router-dom';

function TeamDetailPage ({ match }) {
  // get the team ID from the URL params (destructure props.match.params)
  const { params: { id } } = match;
  // console.log( 'params:', params)
  // console.log( 'props:', props)
  console.log( 'id:', id)

  // set Team info in state
  const [team, setTeam] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
    .then(response => response.json())
    .then(data => {
      const team = data.filter(t => t._id === id)
      console.log('teams data:', data)
      console.log('individual team data:', team)
    }).catch(err => {
      console.log('GET FAILED', err);
    })
  }, [])

  // fetch teams list and filter by team name (from URL params)
  // useEffect(() => {
  //   fetch("http://localhost:3000/teams/list")
  //   .then(response => response.json())
  //   .then(teams => {
  //     const team = teams.filter((t) => t.name.toLowerCase() === teamName.replace(/[-]/g, ' '))
  //     setTeam(team)
  //   }).catch(err => {
  //     console.log('Failed to get team', err);
  //   })
  // }, [])

  return (
    <div>
      <p>Individual Team Page</p>
    </div>
  );
}


export default TeamDetailPage;