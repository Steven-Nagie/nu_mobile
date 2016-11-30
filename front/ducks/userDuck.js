const CREATE_USER = "user/CREATE_USER";
// const LOGIN = "user/LOGIN";
const LOGOUT = "user/LOGOUT";

export function createUser(user) {
  return {type: CREATE_USER, user}
}

export function logout() {
  return {type: LOGOUT}
}

const initialState = {
  user: {}
}

export default function reducer ( state=initialState, action ) {
  switch( action.type ) {
    case CREATE_USER:
      // This return function changes the state.
      return Object.assign({}, action.user);
    case LOGOUT:
      return initialState;
    default: return state;
  }
}
