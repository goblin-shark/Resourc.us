import React, { useState, useLayoutEffect, useEffect} from "react";
import { useHistory } from 'react-router-dom';
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const [user, setUser] = useState({ user: {} });
    const history = useHistory()
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
        document.cookie = `token=${data.token}`
        setUser({
          user: data.user,
        });
        //alert("Login Success!")
        history.goBack();
      })
      .catch(err => {
        alert("Login Failed!")
      });
    };
  
    // Logout updates the user data to default
    const logout = () => {
      console.log("logout")
      document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
      setUser({
        user: {}
      })
    };
  
    return (
      <UserContext.Provider value={{ user, userlogin, logout }}>
        {children}
      </UserContext.Provider>
    );
  }

  export default UserProvider
