import React, { useState } from "react";

const createTeam = () => {
  const [_payload, setPayload] = useState({
    name: "",
    image: "",
    description: "",
    category: "",
  });

  const handleChange = (event) => {
    //event target is each indivisual form that is being inputed
    const { name, value } = event.target;
    // copies previous state and updates only changed key/values
    setPayload({ ..._payload, [name]: value });
  };

  const handleClick = (event) => {
    event.preventDefault();

    // POST the payload to database
    fetch("http://localhost:3000/teams/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then((resp) => resp.json())
      .then((data) => {
        history.push("/");
        alert("Create Team Success!");
      })
      .catch((err) => {
        alert("Create Team Failed! Please Try Again!");
      });
  };

  return (
    <div className="container formContainer">
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
};

export default createTeam;
