const initialState = {
  email: '',
  loggedIn: false
}

const user = (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        email: action.email,
        loggedIn: action.loggedIn
      }
    case 'LOGOUT':
      return {
        email: action.email,
        loggedIn: action.loggedIn
      }
    default: return state
  }
}

export default user;