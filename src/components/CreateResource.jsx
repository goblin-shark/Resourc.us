import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InputTags from "react-input-tags-hooks";
import "react-input-tags-hooks/build/index.css";

const createResource = () => {
  const history = useHistory();
  const [_payload, setPayload] = useState({
    title: "",
    link: "",
    image: "",
    description: "",
    category: "",
    votes: 0,
    tags: [],
  });

  const [_teams, setTeams] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
      .then((resp) => resp.json())
      .then((data) => {
        setTeams(data);
      })
      .catch((err) => {
        alert("Error Redirecting to Create Resource Page!");
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target; //event target is each indivisual form that is being inputed
    setPayload({ ..._payload, [name]: value }); // copies previous state and updates only changed key/values
  };

  const handleUrlChange = (event) => {
    const { name, value } = event.target;
    setPayload({ ..._payload, [name]: value });

    fetch("http://localhost:3000/resource/scrape", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [name]: value }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setPayload({
          ..._payload,
          title: data["title" || "og:title"],
          image: data["image" || "og:image"],
          description: data["description" || "og:description"],
          link: value,
        });
      })
      .catch((err) => {
        console.log("URL Scrape Failed");
      });
  };

  const handleClick = async (event) => {
    event.preventDefault();

    if (_payload.teamId === undefined) {
      alert("Select a Team!");
      return;
    }

    await fetch("http://localhost:3000/user/authenticate", {
      method: "POST",
      credentials: "include",
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        // Don't do anything with the data yet.
      })
      .catch((e) => {
        alert("Error Authenticating User");
        console.log("Error Authenticating User: ", e);
        return;
      });

    await fetch("http://localhost:3000/resource/create", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(_payload),
    })
      .then((resp) => {
        resp.json();
        history.goBack();
      })
      .catch((err) => {
        alert("Error Creating Resource!");
        return;
      });
  };

  const setTags = (newTags) => {
    // copies previous state and updates only changed key/values
    setPayload({ ..._payload, tags: newTags });
  };

  const selectTeam = (e) => {
    const payload = _payload;
    payload.teamId = e.currentTarget.value;
    setPayload(payload);
  };

  const renderImage = () => {
    if (_payload.image) {
      return <img src={_payload.image} />;
    }
  };

  return (
    <div className="container formContainer">
      <h1>Create Resource Page</h1>
      <div className="metaImage">{renderImage()}</div>
      <form>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="title"
            value={_payload.title || ""}
            autoComplete="off"
            className="form-control"
            placeholder="Title"
          ></input>
        </div>
        <div className="form-group">
          <input
            onChange={handleUrlChange}
            name="link"
            value={_payload.link || ""}
            autoComplete="off"
            className="form-control"
            placeholder="link"
          ></input>
        </div>
        <div className="form-group">
          <textarea
            onChange={handleChange}
            name="description"
            value={_payload.description || ""}
            autoComplete="off"
            className="form-control"
            placeholder="Description"
          ></textarea>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            name="category"
            autoComplete="off"
            value={_payload.category || ""}
            className="form-control"
            placeholder="Category"
          ></input>
        </div>
        <div className="form-group">
          <select
            className="form-control form-select"
            onChange={selectTeam}
            defaultValue="default"
          >
            <option value="default">Which team?</option>
            {_teams.map((team, idx) => (
              <option key={"team" + idx} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="form-group">
        <InputTags
          onTag={setTags}
          tagColor="#48c774"
          placeHolder="Press enter to add tags"
        />
      </div>
      <button onClick={handleClick} className="btn btn-primary">
        Create Resource
      </button>
    </div>
  );
};

export default createResource;
