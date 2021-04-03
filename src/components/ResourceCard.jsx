import React, { useState, useEffect } from "react";

// Route this page
// Render resource
// Put request to upvote and downvote

function ResourceCard() {
  const [_resource, setResource] = useState({});
  // const [_upvote, setUpvote] = useState({});
  useEffect(() => {
    fetch("http://localhost:3000/resource/listAll")
      .then((response) => {
        return response.json(); //Parses to JSON
      })
      .then((data) => {
        setResource(data[0]);
        // console.log(data); ENDLESS RUNNING BUG!?
      })
      .catch((err) => {
        console.log("GET FAILED", err);
      });
  }, [_resource]);

  function handleUpvote(event) {
    event.preventDefault();
    const payload = {
      "link" : _resource.link,
      "teamid": _resource.teamid,
      "votes": _resource.votes,
      "upvote": true
    }
    // POST the payload to database
    fetch("http://localhost:3000/resource/upvote", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResource(data)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }
  function handleDownvote(event) {
    event.preventDefault();
    const payload = {
      "link" : _resource.link,
      "teamid": _resource.teamid,
      "votes": _resource.votes,
      "upvote": false
    }
    // POST the payload to database
    fetch("http://localhost:3000/resource/upvote", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setResource(data)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }
  return (
    <div>
      <h1>Resource Card</h1>
      <div>
        <h1>{_resource.link}</h1>
        <h1>{_resource.votes}</h1>
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDownvote}>Downvote</button>
      </div>
    </div>
  );
}

export default ResourceCard;

// const parent = document.getElementById("ethan");
    // const teamid = parent.getAttribute("value");
    // const link = parent.getAttribute("link");

    // const newUpvote = _upvote;
    // newUpvote.link = link;
    // newUpvote.teamId = teamid;
    // newUpvote.votes = 0;
    // newUpvote.upvote = true;
    // console.log(newUpvote);
    // setUpvote(newUpvote);


// {_resource.map((resource) => (
//   <div
//     id="ethan"
//     className="teamCard"
//     value={resource.teamid}
//     key={resource._id}
//     link={resource.link}
//   >
//     <h1>{resource.link}</h1>
//     <h1>{resource.votes}</h1>
//     <button onClick={handleVote}>Upvote</button>
//     <button>Downvote</button>
//   </div>
// ))}
