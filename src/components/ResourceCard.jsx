import React, { useState, useEffect } from "react";

const ResourceCard = (props) => {
  const [_resource, setResource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if(props.resources) {
      setResource(props.resources.sort((a, b) => b.votes - a.votes))
    }
  })

//the props.resources resource info:
//   category: "User Experience"
// createdAt: "2021-04-09T09:01:10.284Z"
// description: "Our latest benchmark of Mobile UX reveals that 52% of e-commerce sites still have severe mobile UX issues — leading to users abandoning their mobile shopping experience. Here are 18 common Mobile UX pitfalls."
// image: "https://cdn.baymard.com/data-broker/graphic-300396-937889825ef489278518d3511613950d.jpg"
// link: "https://baymard.com/blog/2021-current-state-mobile-ecommerce"
// tags: "Design"
// teamId: "60682ccc27cd25b81f7c3e8b"
// title: "The Current State of Mobile UX (18 Common Pitfalls)"
// updatedAt: "2021-04-09T09:03:57.633Z"
// votes: 1
// __v: 0
// _id: "607017d6662c6028c8e0bc6d"

if(!props.resources){
  // VARIABLES FOR FETCH
  let url = "http://localhost:3000/resource/list";
  let _payload = { "teamId": props.teamId };
  let fetchHeader = {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(_payload),
  };

  if (props.teamId === 'allTeams') {
    url = "http://localhost:3000/resource/listAll";
    fetchHeader = {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      }
    };
  }

  useEffect(() => {
    fetch(url, fetchHeader)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Sort the resources by default highest vote count to lowest
        setResource(data.sort((a, b) => b.votes - a.votes))
      })
      .catch((err) => {
        alert(err)
      });
  }, [count]);

}


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

  console.log('passing resource card', _resource)

  return (
    <div className="container">
      {_resource.map((resource, idx, arr) => (
        < div
          className="resourceCard"
          key={idx}
        >
          <div className="resourcePreview">
            <div className="imageContainer">
              <img src={resource.image} />
            </div>
            <div className="metaContainer">
              <h3>{resource.title}</h3>
              {/* Display all tags of each resource*/}
              <div className="tags">
                {arr[idx].tags.map((tag, idx) => <div key={"rsc" + idx} className="tag">{tag}</div>)}
              </div>
            </div>
          </div>
          <a href={resource.link} target="_blank"></a>
          <div className="votes">
            <div className="actions">
              <button key={"button1"} ><i onClick={handleUpvote} votes={resource.votes} id={resource._id} className='bx bxs-up-arrow'></i></button>
              <span className="voteCount">{resource.votes}</span>
              <button key={"button2"} ><i onClick={handleDownvote} votes={resource.votes} id={resource._id} className='bx bxs-down-arrow'></i></button>
            </div>
          </div>
        </div>
      ))
      }
    </div >
  );
}

export default ResourceCard;