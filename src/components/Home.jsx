import React, { useEffect, useState } from "React";

function Home() {
  const [_teams, setTeams] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:3000/teams/list" ).then(response => {
    //   response.json(); //Parses to JSON
    // }).then(data => {
    //   setTeams(data);
    // }).catch(err => {
    //   console.log('GET FAILED', err);
    // })
  })

  return (
    <div className="container">
      <h1>Home Page</h1>
      
      
      
    </div>
  );
}

export default Home;

// {/* {_teams.map( team => 
//         <div>
//           <h1>{team.title}</h1>
//         </div>
//       )} */}