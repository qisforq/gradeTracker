import {ADD_COURSE, ADD_ASSIGNMENT} from '../constants/actionTypes.js';

export const addCourse = (course) => (
  {
    type: ADD_COURSE,
    payload: course
  }
);

export const addAssignment = (assignment) => (
  {
    type: ADD_ASSIGNMENT,
    payload: assignment
  }
);
