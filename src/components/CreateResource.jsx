import React, { useState, useEffect } from "react";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownButton from "react-bootstrap/DropdownButton";

function createResource() {
  // State
  const [_payload, setPayload] = useState({
    title: "",
    link: "",
    description: "",
    category: "",
    votes: 0,
  });
  const [_teams, setTeams] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
      .then((response) => {
        return response.json(); //Parses to JSON
      })
      .then((data) => {
        setTeams(data);
        // console.log(data); ENDLESS RUNNING BUG!?
      })
      .catch((err) => {
        console.log("GET FAILED", err);
      });
  }, []);
  function handleChange(event) {
    const { name, value } = event.target; //event target is each indivisual form that is being inputed
    console.log(_payload);
    setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
  }
  function handleClick(event) {
    event.preventDefault();
    //test if server is working
    // POST the payload to database
    fetch("http://localhost:3000/resource/create", {
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
        console.log(data);
      })
      .catch((err) => {
        console.log("Post Fail", err);
      });
    // ADD RESET STATE HERE AFTER SUMBIT
  }

  function selectTeam(e) {
    const payload = _payload;
    payload.teamId = e.currentTarget.value;
    setPayload(payload);
    console.log(_payload);
  }
  return (
    <div className="container">
      <h1>Create Resource Page</h1>

      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="title"
            value={_payload.title}
            autoComplete="off"
            className="form-control"
            placeholder="Title"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="link"
            value={_payload.link}
            autoComplete="off"
            className="form-control"
            placeholder="link"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="description"
            value={_payload.description}
            autoComplete="off"
            className="form-control"
            placeholder="Description"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="category"
            autoComplete="off"
            value={_payload.category}
            className="form-control"
            placeholder="Category"
          ></input>
        </div>
        <button className="btn btn-lg btn-info">Add to Team</button>

        <select onChange={selectTeam}>
          {_teams.map((team) => (
            <option value={team._id}>{team.name}</option>
          ))}
        </select>

        <button onClick={handleClick} className="btn btn-lg btn-info">
          Create Resource
        </button>
      </form>
    </div>
  );
}

export default createResource;
