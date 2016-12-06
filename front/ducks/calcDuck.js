const CHANGE_COMPONENT = "calc/CHANGE_COMPONENT";

export function changeComp(component) {
  return {type: CHANGE_COMPONENT, component}
}

const initialState = 0;

export default function reducer ( state=initialState, action ) {
  switch( action.type ) {
    case CHANGE_COMPONENT:
      return action.component;
    default: return state;
  }
}
