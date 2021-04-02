import React, { useState } from "React";
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
    const { key, value } = event.target;

    setPayload((prevPayload) => {
      //   return {
      //     ...prevPayload,
      //     [name]:value
      //   }
      var newPayload = prevPayload;

      if (key === "title") {
        newPayload.title = value;
      } else if (key === "avatar") {
        newPayload.avatar = value;
      } else if (key === "description") {
        newPayload.description = value;
      } else if (key === "category") {
        newPayload.category = value;
      }
      console.log(newPayload)
      return newPayload;
      
    });
  }
  function handleClick(event) {
    event.preventDefault();
    //test if server is working
    console.log(this._payload);
    // POST the payload to database
    fetch("http://localhost:3000/teams/create", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this._payload)
    }).then(response => {
      response.json(); 
    }).then(data => {
      console.log('Post Success: ', data)
    }).catch(err => {
      console.log('Post Fail', err)
    })
  }

  return (
    <div className="container">
      <h1>Create Team Page</h1>
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            key="title"
            value={input.title}
            autoComplete="off"
            className="form-control"
            placeholder="Team Name"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            key="avatar"
            value={input.avatar}
            autoComplete="off"
            className="form-control"
            placeholder="Avatar"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            key="description"
            value={input.description}
            autoComplete="off"
            className="form-control"
            placeholder="Description"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            key="category"
            value={input.category}
            autoComplete="off"
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
