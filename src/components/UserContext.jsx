import React, { useState } from "react";
import { useHistory } from "react-router-dom";
export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context
  const [user, setUser] = useState({ user: {} });
  const history = useHistory();
  // Login updates the user data with a name parameter
  const userLogin = async (e, values) => {
    e.preventDefault();

    await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((rsp) => rsp.json())
      .then((data) => {
        document.cookie = `token=${data.token}`;
        setUser({
          user: data.user,
        });
        //alert("Login Success!");
        history.goBack();
      })
      .catch((err) => {
        alert("Login Failed!");
      });
  };

  // userLogout updates the user data to default
  const userLogout = () => {
    // Set the cookie to an expired time to remove it.
    // TODO: Should still do more thorough userLogout authentication though...
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    // Clear current user
    setUser({
      user: {},
    });
  };

  //checks to see if there is a valid token key in users local storage
  const userIsLoggedIn = () => {
    return document.cookie ? true : false;
  };

  return (
    <UserContext.Provider
      value={{ user, userLogin, userLogout, userIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
