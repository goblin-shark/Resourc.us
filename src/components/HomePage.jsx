import React, { useEffect, useState } from "react";

function HomePage() {
    // State for our three teams
    const [_teams, setTeams] = useState([]);
    // State for each teams' 3 resources.
    const [_resources, setResources] = useState([]);

    useEffect(() => {
        bodyWithId = _teams;

        fetch('http://localhost:3000/teams/listThree')
            .then(response => {
                return response.json(); //Parses to JSON
            }).then(data => {
                console.log(data);
                setTeams(data);
                // Here we have our list of three teams.
                // For each team, retrieve three resources
                // Store all 3 sets of 3 resources in an array...
                // [ [{1}, {2}, {3}], [{4}, {5}, {6}], [{7}, {8}, {9}] ]
                let resources = []
                for (let i = 0; i < data.length; i++) {
                    let postBody = data[i]
                    // Add the team id to the body object to get appropriate resources
                    // Am i updating state incorrectly here?
                    postBody["teamId"] = data[i][_id]
                    fetch('http://localhost:3000/resources/listThreeResources', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(postBody)
                    })
                        .then(resp => console.log(resp))
                        .then(data => {
                            // This should push each set of resources in state array
                            resources.push(data)
                            history.push("/");
                        })
                        .catch(err => console.log('Error fetching 3 team resources: ', err));
                }
            }).catch(err => {
                console.log('Error fetching 3 teams', err);
            })

        setResources(resources)
    })

    return (
        <div className="container">
            <h1>Home Page</h1>
            {
                _teams.forEach((el, i) => {
                    <div>
                        <h1>{el.name}</h1>
                        {/*Display Resources here somehow...*/}
                    </div>
                })
            }
        </div>
    );
}

export default HomePage;