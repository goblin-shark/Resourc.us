import React, { useEffect, useState } from "react";
import ResourceCard from "./../components/ResourceCard"

function HomePage() {
  const [_teams, setTeams] = useState([]);
  const [_resources, setResources] = useState([]);

  return (
    <div className="container">
      <h1>Home Page</h1>
      <ResourceCard teamId="allTeams"></ResourceCard>
    </div>
  );
}

export default HomePage;