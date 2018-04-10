import { ADD_ASSIGNMENT } from '../constants/actionTypes.js';


const assignmentReducer = (state = [], action) => {
  if (action.type === ADD_ASSIGNMENT) {
    let found = state.findIndex((e) => e.name === action.payload.name)

    if (found >= 0) {
      // console.log("action.payload if alreadyExists:", action.payload);
      let newState = [...state];
      newState[found].grade = action.payload.grade;
      return newState;
    } else {
      // console.log("action.payload if NOT alreadyExists:", action.payload);
      return [...state, action.payload];
    }
  } else {
    return state;
  }
};

export default assignmentReducer;
