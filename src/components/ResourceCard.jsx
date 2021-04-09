import React, { useState, useEffect } from "react";

const ResourceCard = ({ teamId }) => {
  const [_resource, setResource] = useState([]);
  const [count, setCount] = useState(0);
  const _payload = { "teamId": teamId }

  useEffect(() => {
    fetch("http://localhost:3000/resource/list", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Sort the resources by default highest vote count to lowest
        setResource(data.sort((a, b) => b.votes - a.votes))
        console.log('_resource:', _resource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });

    console.log("TEAM ID in resource card: ", teamId)
  }, [count]);

  const handleUpvote = (event) => {
    event.preventDefault();

    const id = event.target.id;
    const votes = Number(event.target.getAttribute('votes'));
    const payload = {
      "_id": id,
      "votes": votes,
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
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        // Sort the resources by default highest vote count to lowest
        setResource(newResource.sort((a, b) => b.votes - a.votes))
      })
      .catch((err) => {
        alert("Upvote Failed!")
      });
  }

  const handleDownvote = (event) => {
    event.preventDefault();

    const id = event.target.id;
    const votes = Number(event.target.getAttribute('votes'));
    const payload = {
      "_id": id,
      "votes": votes,
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
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        // Sort the resources by default highest vote count to lowest
        setResource(newResource.sort((a, b) => b.votes - a.votes))
      })
      .catch((err) => {
        alert("Downvote Failed!")
      });
  }

  return (
    <div className="container">
      {_resource.map((resource, idx, arr) => (
        < div
          className="resourceCard"
          key={idx}
        >
          <div className="votes">
            <div className="voteCount">{resource.votes}</div>
            <div className="actions">
              <button key={"button1"} ><i onClick={handleUpvote} votes={resource.votes} id={resource._id} class='bx bxs-upvote'></i></button>
              <button key={"button2"} ><i onClick={handleDownvote} votes={resource.votes} id={resource._id} class='bx bxs-downvote' ></i></button>
            </div>
          </div>
          <div className="link">
            <a href={resource.link} target="_blank">{resource.link}</a>
          </div>
          {/* Display all tags of each resource*/}
          <div className="tags">
            {arr[idx].tags.map((tag) => <div className="tag">{tag}</div>)}
          </div>
        </div>
      ))
      }
    </div >
  );
}

export default ResourceCard;