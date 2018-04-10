import {combineReducers} from 'redux';
import courseReducer from './courseReducer.js';
import assignmentReducer from './assignmentReducer.js';

export default combineReducers({
  courses: courseReducer,
  assignments: assignmentReducer
});
