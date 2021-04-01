import React, { useState } from "react";
// import axios from "axios";

function createTeam() {
  //state
  const [_payload, setPayload] = useState({
    name: "",
    image: "",
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
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(_payload)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
            name="name"
            value={_payload.name}
            // value=
            className="form-control"
            placeholder="Team Name"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="image"
            value={_payload.image}
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
