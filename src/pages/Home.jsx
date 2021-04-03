import React from "react";

function HomePage () {
  return (
    <div>
      <h1>This is the homepage.</h1>
    </div>
  )
}

export default HomePage;

// import React, { useEffect, useState } from "react";

// function Home() {
//   const [_teams, setTeams] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:3000/teams/list" ).then(response => {
//       response.json(); //Parses to JSON
//     }).then(data => {
//       console.log(data);
//       setTeams(data);
//     }).catch(err => {
//       console.log('GET FAILED', err);
//     })
//   })

//   return (
//     <div className="container">
//       <h1>Home Page</h1>
//       {_teams.map( team => 
//         <div>
//           <h1>{team.title}</h1>
//         </div>
//       )}
      
      
//     </div>
//   );
// }

// export default Home;

