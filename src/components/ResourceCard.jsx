import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

const ResourceCard = (props) => {
  const [_resource, setResource] = useState([]);
  const [count, setCount] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (props.resources) {
      setResource(props.resources.sort((a, b) => b.votes - a.votes));
    }
  }, []);

  if (!props.resources) {
    // VARIABLES FOR FETCH
    let url = "http://localhost:3000/resource/list";
    let _payload = { teamId: props.teamId };
    let fetchHeader = {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    };

    if (props.teamId === "allTeams") {
      url = "http://localhost:3000/resource/listAll";
      fetchHeader = {
        method: "GET",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      };
    }

    useEffect(() => {
      fetch(url, fetchHeader)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // Sort the resources by default highest vote count to lowest
          setResource(data.sort((a, b) => b.votes - a.votes));
          props.loadInitial(data);
        })
        .catch((err) => {
          //alert(err);
        });
    }, [count]);
  }

  const handleUpvote = (event) => {
    event.preventDefault();

    const id = event.target.id;
    const votes = Number(event.target.getAttribute("votes"));
    const payload = {
      _id: id,
      votes: votes,
      upvote: true,
      user: user,
    };

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
        setResource(newResource.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        alert("Upvote Failed!");
      });
  };

  const handleDownvote = (event) => {
    event.preventDefault();

    const id = event.target.id;
    const votes = Number(event.target.getAttribute("votes"));
    const payload = {
      _id: id,
      votes: votes,
      upvote: false,
      user: user,
    };

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
        setResource(newResource.sort((a, b) => b.votes - a.votes));
      })
      .catch((err) => {
        alert("Downvote Failed!");
      });
  };

  return (
    <div className="container">
      {_resource.map((resource, idx, arr) => (
        <div className="resourceCard" key={idx}>
          <div className="resourcePreview">
            <div className="imageContainer">
              <img src={resource.image} />
            </div>
            <div className="metaContainer">
              <h3>{resource.title}</h3>
              {/* Display all tags of each resource*/}
              <div className="tags">
                {arr[idx].tags.map((tag, idx) => (
                  <div key={"rsc" + idx} className="tag">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <a href={resource.link} target="_blank"></a>
          <div className="votes">
            <div className="actions">
              <button key={"button1"}>
                <i
                  onClick={handleUpvote}
                  votes={resource.votes}
                  id={resource._id}
                  className="bx bxs-up-arrow"
                ></i>
              </button>
              <span className="voteCount">{resource.votes}</span>
              <button key={"button2"}>
                <i
                  onClick={handleDownvote}
                  votes={resource.votes}
                  id={resource._id}
                  className="bx bxs-down-arrow"
                ></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceCard;
