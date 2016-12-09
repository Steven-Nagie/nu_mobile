const CHANGE_CHALLENGE = "challenge/CHANGE_CHALLENGE";

export function changeChallenge(challenge) {
  return {type: CHANGE_CHALLENGE, challenge}
}

const initialState = "transportation";

export default function reducer (state=initialState, action) {
  switch( action.type ) {
    case CHANGE_CHALLENGE:
      return action.challenge;
    default: return state;
  }
}
