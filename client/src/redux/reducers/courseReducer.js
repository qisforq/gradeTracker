import { ADD_COURSE } from '../constants/actionTypes.js';


const courseReducer = (state = [], action) => {
  if (action.type === ADD_COURSE && action.payload !== undefined) {
    return [...state, action.payload];
  } else {
    return [...state];
  }
};

export default courseReducer;


// const initialState = {
//   courses: []
// };
//
// const courseReducer = (state = initialState, action) => {
//   if (action.type === ADD_COURSE) {
//     return {...state, courses: [...state.courses, action.payload]};
//   } else {
//     return state;
//   }
// };
