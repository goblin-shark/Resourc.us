// import React, { useState, useEffect }from 'react'
// import { Link, Route } from 'react-router-dom';

// const FilteredResults = (props) => {
//   const teamId = '';
//   const [_resource, setResource] = useState([]);
//   const [count, setCount] = useState(0);

//   const teamSearch = props.location.state.search.team;
//   const tagSearch = props.location.state.search.tags;


//   console.log("props", tagSearch)

//   // VARIABLES FOR FETCH
//   let url = "http://localhost:3000/resource/list";
//   let _payload = { "teamId": teamId };
//   let fetchHeader = {
//     method: "POST",
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(_payload),
//   };

//   if ( teamId === 'allTeams') {
//     url = "http://localhost:3000/resource/listAll";
//     fetchHeader = {
//       method: "GET",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       }
//     };
//   }

//   useEffect(() => {
//     fetch(url, fetchHeader)
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         // Sort the resources by default highest vote count to lowest
//         setResource(data.sort((a, b) => b.votes - a.votes))
//       })
//       .catch((err) => {
//         alert(err)
//       });
//   }, [count]);

//   const handleUpvote = (event) => {
//     event.preventDefault();

//     const id = event.target.id;
//     const votes = Number(event.target.getAttribute('votes'));
//     const payload = {
//       "_id": id,
//       "votes": votes,
//       "upvote": true
//     }

//     // POST the payload to database
//     fetch("http://localhost:3000/resource/upvote", {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const newResource = _resource;
//         for (let i = 0; i < newResource.length; i++) {
//           if (newResource[i].link === data.link) {
//             newResource[i] = data;
//           }
//         }
//         setCount(count + 1);
//         // Sort the resources by default highest vote count to lowest
//         setResource(newResource.sort((a, b) => b.votes - a.votes))
//       })
//       .catch((err) => {
//         alert("Upvote Failed!")
//       });
//   }

//   const handleDownvote = (event) => {
//     event.preventDefault();

//     const id = event.target.id;
//     const votes = Number(event.target.getAttribute('votes'));
//     const payload = {
//       "_id": id,
//       "votes": votes,
//       "upvote": false
//     }

//     // POST the payload to database
//     fetch("http://localhost:3000/resource/upvote", {
//       method: "POST",
//       headers: {
//         Accept: "application/json, text/plain, */*",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         const newResource = _resource;
//         for (let i = 0; i < newResource.length; i++) {
//           if (newResource[i].link === data.link) {
//             newResource[i] = data;
//           }
//         }
//         setCount(count + 1);
//         // Sort the resources by default highest vote count to lowest
//         setResource(newResource.sort((a, b) => b.votes - a.votes))
//       })
//       .catch((err) => {
//         alert("Downvote Failed!")
//       });
//   }


//   const colors = [
//     ['#ff4b1f', '#ff9068'],
//     ['#16BFFD', '#CB3066'],
//     ['#1D4350', '#A43931'],
//     ['#a80077', '#66ff00'],
//     ['#ff4b1f', '#1fddff'],
//     ['#0D0D0D', '#434343'],
//     ['#4B79A1', '#283E51'],
//     ['#834d9b', '#d04ed6'],
//     ['#0099F7', '#F11712'],
//     ['#B24592', '#F15F79'],
//     ['#673AB7', '#512DA8'],
//     ['#005C97', '#363795']
//   ]
//   function colorPicker() {
//     return Math.floor(Math.random() * colors.length);
//   }

//   return (
//     <div className="cardContainer">
//       {teamSearch.map(team =>
//         <div className="teamCard" key={team.name}>
//           <header>
//             <img src="https://images.unsplash.com/photo-1612392166886-ee8475b03af2?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80" />
//             <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
//             <h1>{team.name}</h1>
//           </header>
//           <section>
//             <div className="meta">
//               <div>{team.category}</div>
//               <div><i className='bx bx-merge'></i> 342</div>
//               <div><i className='bx bxs-user-account'></i> 24</div>
//             </div>
//             <article>
//               <p>{team.description}</p>
//             </article>
//             <div className="actions">
//               <div>
//                 <Link className="btn btn-default" to="/#">Join</Link>
//                 {/* <Link className="btn btn-primary" to={"/teams/" + team.name.toLowerCase().trim().replace(/\s/g, "-")} team={team}>View</Link> */}
//                 <Link className="btn btn-primary" to={"/teams/" + team._id}>View</Link>
//               </div>
//             </div>
//           </section>
//         </div>
//       )}
//       {tagSearch.map(resource => (
//         <div className="teamCard">
//           <header>
//             <img src={resource.image}/>
//             <div className="mask" style={{ background: `linear-gradient(${colors[colorPicker()][0]}, ${colors[colorPicker()][1]})` }}></div>
//             <h1 style={{fontSize: "98%"}}>{resource.title}</h1>
//           </header>
//           <section>
//             <div className="meta">
//               <div>{resource.category}</div>
//               <div><i className='bx bx-merge'></i> 342</div>
//               <div><i className='bx bxs-user-account'></i> 24</div>
//             </div>
//             <article>
//               <p>{resource.description}</p>
//             </article>
//             <Link className="btn btn-default" to={"/teams/" + resource.teamId}>View Team</Link>
//             <Link className="btn btn-primary" to={resource.link}>See More</Link>
//           </section>
//         </div>
//       ))
//       }
//     </div>
//   );
// }

// export default FilteredResults


      
//       category: "Software Engineering"
// createdAt: "2021-04-09T09:12:45.443Z"
// description: "An API for the awesome HTTP Cats! Use it in your website to show funny error messages."
// image: "https://http.cat/100.jpg"
// link: "https://http.cat/"
// tags: "HTTP"
// teamId: "6068dcd3dc70265cbca8f2d7"
// title: "HTTP Cats"
// updatedAt: "2021-04-09T09:13:03.815Z"
// votes: 9