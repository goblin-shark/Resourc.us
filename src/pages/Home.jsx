import React, { useEffect, useState } from "react";
import ResourceCard from "./../components/ResourceCard";

function HomePage() {
  // State for our three teams
  const [_teams, setTeams] = useState([]);
  // State for each teams' 3 resources.
  // [ [{1}, {2}, {3}], [{4}, {5}, {6}], [{7}, {8}, {9}] ]
  //const [_resources, setResources] = useState([[{}, {}, {}], [{}, {}, {}], [{}, {}, {}]]);
  const [_resources, setResources] = useState([]);

  // Old code that's purpose was to fetch a list of three teams and three resources each
  // Need to debug why we couldn't access the nested resource arrays
  // useEffect(() => {
  //   let resources = []
  //   fetch('http://localhost:3000/teams/listThree')
  //     .then(response => {
  //       return response.json(); //Parses to JSON
  //     }).then(data => {
  //       // Here we have our list of three teams.
  //       // For each team, retrieve three resources
  //       // Store all 3 sets of 3 resources in an array...
  //       // [ [{1}, {2}, {3}], [{4}, {5}, {6}], [{7}, {8}, {9}] ]
  //       for (let i = 0; i < data.length; i++) {
  //         let postBody = {};// = data[i]
  //         // Add the team id to the body object to get appropriate resources
  //         // Am i updating state incorrectly here?
  //         console.log("DATA [", i, "]:", data[i]._id)
  //         postBody["teamId"] = "606275b0cb1a340bdc7d8121"//data[i]._id
  //         console.log("postBody: ", postBody)
  //         fetch('http://localhost:3000/resource/listThree', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(postBody)
  //         })
  //           .then(resp => resp.json())
  //           .then(resourcedata => {
  //             // This should push each set of resources in state array
  //             resources.push(resourcedata)
  //             //history.push("/");
  //           })
  //           .catch(err => console.log('Error fetching 3 team resources: ', err));
  //       }

  //       setResources(resources)
  //       setTeams(data);
  //     }).catch(err => {
  //       console.log('Error fetching 3 teams', err);
  //     })

  //   // Update our resources state
  // }, [])

  // Temporarily going to just display a list of all resources on the homepage
  // useEffect(() => {
  //   fetch("http://localhost:3000/resource/listAll")
  //     .then(resp => resp.json())
  //     .then(data => setResources(data))
  //     .catch(err => {
  //       alert("List All Resources Failed!")
  //     })
  // }, [])

  return (
    <div className="container">
      <h1>Home Page</h1>
      <ResourceCard teamId="allTeams"></ResourceCard>
    </div>
  );
}

export default HomePage;
