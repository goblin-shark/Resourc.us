import React, { useState, useLayoutEffect, useEffect} from "react";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ name: '' });
  
    // Login updates the user data with a name parameter
    const userlogin = async (e, values) => {
      e.preventDefault()
      console.log("INISDE LOGIN: ", values)
    await fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(rsp => rsp.json())
      .then(data => {
        // Enter something that stores or handles cookies or JWT
        alert("Login Success!")
        console.log("Data: ", data);
        document.cookie = `token=${data.token}`
        localStorage.username = data.name;
        history.push("/");
        setUser((user) => ({
          name: "Eric",
        }));
      })
      .catch(err => {
        console.log("Login Failed! error: ", err)
        while(1);
      });
    };
  
    // Logout updates the user data to default
    const logout = () => {
      setUser((user) => ({
        name: '',
        auth: false,
      }));
    };
  
    return (
      <UserContext.Provider value={{ user, userlogin, logout }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider
