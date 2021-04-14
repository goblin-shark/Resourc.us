//creates the token to be used for local storage
const TOKEN_KEY = 'OldTokenKey';


//sets the token key in users local storage
export const login = () => {
  localStorage.setItem(TOKEN_KEY, 'TestLogin');
}
// removes the token key from local storage
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
}

//checks to see if there is a valid token key in users local storage
export const isLogin = () => {
  /*
    fetch request to user/validate
    send in the body the token
    {
      token : document.cookie.token
    }
        fetch('http://localhost:3000/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
  */
  fetch("http://localhost:3000/user/authenticate", {
    method: 'POST',
    // headers: {
    //   'Cookie' : token=document.cookie
    // }
    mode: 'no-cors',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8080/',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
    .then(rsp => rsp.json())
    .then(data => {
      return true
    })
    .catch(() => {
      alert("Error validating user")
      return false;
    })

  //console.log("document.cookie: ", document.cookie)

  // if (localStorage.getItem(TOKEN_KEY)) {
  //   return true;
  // }
  // return false;
}