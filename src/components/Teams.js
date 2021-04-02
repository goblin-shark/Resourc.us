import React from "React"


function Teams() {
  const [_teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teams/list").then(response => {
      response.json(); //Parses to JSON
    }).then(data => {
      setTeams(data);
    }).catch(err => {
      console.log('GET FAILED', err);
    })
  })
  return (
    <div className='container'>
      <h1>Teams Page</h1>
      {_teams.map( team => 
        <div>
          <h1>{team.title}</h1>
          <h1>{team.avatar}</h1>
          <h1>{team.description}</h1>
          <h1>{team.category}</h1>
        </div>
      )}
    </div>
  )
}

export default Teams;