import React, {useState, useEffect} from "react";
// import { Link } from 'react-router-dom';

function TeamDetailPage (props) {
  // get the team name from the URL params
  // const { params } = match;
  // console.log( 'params:', params)
  console.log( 'props:', props)

  // set Team info in state
  // const [team, setTeam] = useState(null);

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