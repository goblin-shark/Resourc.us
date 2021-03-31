import React, { useState } from "react";
// import axios from "axios";

function createTeam() {
  //state
  const [_payload, setPayload] = useState({
    title: "",
    avatar: "",
    description: "",
    category: "",
  });

  function handleChange(event) {
    const { name, value } = event.target; //event target is each indivisual form that is being inputed

    setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
  }
  function handleClick(event) {
    event.preventDefault();
    //test if server is working
    console.log(_payload);
    // POST the payload to database
    fetch("http://localhost:3000/teams/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log("Post Success: ", data);
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
    // ADD RESET STATE HERE AFTER SUMBIT
  }

  return (
    <div className="container">
      <h1>Create Team Page</h1>
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="title"
            value={_payload.title}
            // value=
            className="form-control"
            placeholder="Team Name"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="avatar"
            value={_payload.avatar}
            className="form-control"
            placeholder="Avatar"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="description"
            value={_payload.description}
            className="form-control"
            placeholder="Description"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="category"
            value={_payload.category}
            className="form-control"
            placeholder="Category"
          ></input>
        </div>
        <button onClick={handleClick} className="btn btn-lg btn-info">
          Create Team
        </button>
      </form>
    </div>
  );
}

export default createTeam;
