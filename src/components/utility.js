//creates the token to be used for local storage
const TOKEN_KEY = 'jwt';


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
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  }
  return false;
}