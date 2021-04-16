import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { useHistory } from "react-router-dom";

const MyTeams = () => {
  const [_teams, setTeams] = useState([]);
  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:3000/teams/list")
      .then((response) => {
        return response.json(); //Parses to JSON
      })
      .then((data) => {
        //filter out teams whose user list does not contain current user id
        const filteredData = data.filter((el, i, idx) => {
          return el.userList.includes(user.user._id);
        });
        setTeams(filteredData);
      })
      .catch((err) => {
        console.log("List My Teams Failed", err);
      });
  }, []);

  const colors = [
    ["#ff4b1f", "#ff9068"],
    ["#16BFFD", "#CB3066"],
    ["#1D4350", "#A43931"],
    ["#a80077", "#66ff00"],
    ["#ff4b1f", "#1fddff"],
    ["#0D0D0D", "#434343"],
    ["#4B79A1", "#283E51"],
    ["#834d9b", "#d04ed6"],
    ["#0099F7", "#F11712"],
    ["#B24592", "#F15F79"],
    ["#673AB7", "#512DA8"],
    ["#005C97", "#363795"],
  ];
  function colorPicker() {
    return Math.floor(Math.random() * colors.length);
  }

  const joinTeam = async (e, teamId) => {
    //e.preventDefault();
    await fetch("http://localhost:3000/teams/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        teamId: teamId,
        user: user.user,
      }),
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        console.log("JOIN TEAM SUCCESS");
      })
      .catch((err) => {
        alert("JOIN TEAM FAILED: ", err);
        history.goBack();
      });
  };

  return (
    <div className="cardContainer">
      {_teams.map((team) => (
        <div className="teamCard" key={team.name}>
          <header>
            <img src="https://images.unsplash.com/photo-1612392166886-ee8475b03af2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80" />
            <div
              className="mask"
              style={{
                background: `linear-gradient(${colors[colorPicker()][0]}, ${
                  colors[colorPicker()][1]
                })`,
              }}
            ></div>
            <h1>{team.name}</h1>
          </header>
          <section>
            <div className="meta">
              <div>{team.category}</div>
              <div>
                <i className="bx bx-merge"></i>
                {team.resourceCount}
              </div>
              <div>
                <i className="bx bxs-user-account"></i> {team.userList.length}
              </div>
            </div>
            <article>
              <p>{team.description}</p>
            </article>
            <div className="actions">
              <div>
                <Link className="btn btn-primary" to={"/teams/" + team._id}>
                  View
                </Link>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  );
};

export default MyTeams;
