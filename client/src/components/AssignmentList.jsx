import React, { Component } from 'react';
import {connect} from "react-redux";
import AssignmentForm from './AssignmentForm.jsx';
import Assignment from './Assignment.jsx';
import CalculateGrades from './CalculateGrades.jsx';


const mapDispatchToProps = (dispatch) => {
  return {
    addAssignment: (assignment) => dispatch(addAssignment(assignment))
  };
};

const mapStateToProps = (state) => {
  return {
    assignments: state.assignments
  };
}

const ConnectedAssignmentList = ({assignments, course, test}) => {
  // console.log('assignments:', assignments, '<<<<<');
  return (
    <div>
      <label>
        <h2>Assignments for {course.name}</h2>
      </label>
      <div>
          { assignments.filter((aObj) => aObj.course_id === course.id).length ? (
            <ul>{
              assignments.map((aObj, i) => {
                let {course_id, grade} = aObj
                if (course.id === course_id) {
                  // ^^^ only show assignments for clicked course
                  return (<Assignment data={grade} key={i} assignment={aObj}/>)
                }
              })
            }</ul>
            ) : (
              <div>No assignments yet! Enter one in below:</div>
            )}
      </div>
      <div>
        <AssignmentForm courseId={course.id} courseName={course.name}/>
      </div>
      <div>
        <CalculateGrades courseId={course.id} test={test}/>
      </div>
    </div>
  )
};


const AssignmentList = connect(mapStateToProps, mapDispatchToProps)(ConnectedAssignmentList)

export default AssignmentList;
