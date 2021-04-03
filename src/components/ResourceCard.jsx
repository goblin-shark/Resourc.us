import React, { useState, useEffect } from "react";

// Route this page
// Render resource
// Put request to upvote and downvote

function ResourceCard() {
  const [_resource, setResource] = useState([]);
  const [count, setCount] = useState(0);
  // const [_upvote, setUpvote] = useState({});
  const _payload={"teamId": "606275b0cb1a340bdc7d8121"}
  
  useEffect(() => {
    console.log(_payload)
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
        // console.log(data);
        setResource(data)
        console.log('_resource:',_resource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }, [count]);

//get resource id
//get current resource vote
//update state
  function handleUpvote(event) {
   
    console.log('COUNT', count)
    event.preventDefault();
    const id=event.target.id;
    // const parent = document.getElementById(id);
    // const teamid = parent.getAttribute("value");
    // const link = parent.getAttribute("link");
    // const votes = Number(parent.getAttribute("votes"));
    const votes=Number(event.target.getAttribute('votes'));
    // console.log('HERE',teamid);
    const payload = {
      "_id" : id,
      "votes": votes,
      "upvote": true
    }
    console.log('payload:', payload)
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
        console.log('data sent back:' ,data);
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        setResource(newResource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }

  function handleDownvote(event) {
   
    console.log('COUNT', count)
    event.preventDefault();
    const id=event.target.id;
    // const parent = document.getElementById(id);
    // const teamid = parent.getAttribute("value");
    // const link = parent.getAttribute("link");
    // const votes = Number(parent.getAttribute("votes"));
    const votes=Number(event.target.getAttribute('votes'));
    // console.log('HERE',teamid);
    const payload = {
      "_id" : id,
      "votes": votes,
      "upvote": false
    }
    console.log('payload:', payload)
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
        console.log('data sent back:' ,data);
        const newResource = _resource;
        for (let i = 0; i < newResource.length; i++) {
          if (newResource[i].link === data.link) {
            newResource[i] = data;
          }
        }
        setCount(count + 1);
        setResource(newResource)
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
  }
  // function handleDownvote(event) {
   
  //   event.preventDefault();
  //   const parent = document.getElementById("ethan");
  //   const teamid = parent.getAttribute("value");
  //   const link = parent.getAttribute("link");
  //   const votes = Number(parent.getAttribute("votes"));
  //   console.log('HERE',teamid);
  //   const payload = {
  //     "link" : link,
  //     "teamId": teamid,
  //     "votes": votes,
  //     "upvote": false
  //   }
  //   console.log('payload:', payload)
  //   // POST the payload to database
  //   fetch("http://localhost:3000/resource/upvote", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log('data sent back:' ,data);
  //       const newResource = _resource;
  //       for (let i = 0; i < newResource.length; i++) {
  //         if (newResource[i].link === data.link) {
  //           newResource[i] = data;
  //         }
  //       }
  //       setResource(newResource)
  //     })
  //     .catch((err) => {
  //       console.log("Post Fail", err);
  //     });
  // }
  return (
    <div>
      {/* <h1>Resource Card</h1>
      <div>
        <h1>{_resource.link}</h1>
        <h1>{_resource.votes}</h1>
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleDownvote}>Downvote</button>
      </div> */}
      {_resource.map((resource) => (
  <div
  
    className="teamCard"
    // value={resource.teamId}
    key={resource._id}
    // link={resource.link}
    // votes={resource.votes}
  >
    <h1>{resource.link}</h1>
    <h1>{resource.votes}</h1>
    <button onClick={handleUpvote}  votes={resource.votes} id={resource._id} >Upvote</button>
    <button onClick={handleDownvote} votes={resource.votes} id={resource._id} >Downvote</button>
  </div>
))}
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
