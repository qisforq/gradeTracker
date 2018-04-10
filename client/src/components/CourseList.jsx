import React from 'react';
import {connect} from "react-redux";
import axios from 'axios';
import promiseMiddleware from 'redux-promise';
import Course from './Course.jsx';
import AssignmentList from './AssignmentList.jsx'
import CourseForm from './CourseForm.jsx';



const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (course) => dispatch(addCourse(course))
  };
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses
  };
}

class ConnectedCourseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderCourse: {
        course: '',
        toggle: false,
      },
    };
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    if (e.target.id === 'goBack') {
      this.setState({
        renderCourse: {
          course: this.state.renderCourse.course,
          toggle: !this.state.renderCourse.toggle
        }
      });
      return;
    }
    let target = this.props.courses[e.target.id]
    let currentCourse = this.state.renderCourse.course;
    // console.log(this.props.courses[e.target.id]);

    if (currentCourse.name !== target.name) {
      this.setState({
        renderCourse: {
          course: target,
          toggle: true
        }
      });
    } else {
      this.setState({
        renderCourse: {
          course: target,
          toggle: !this.state.renderCourse.toggle
        }
      })
    }
  };


  render() {
    return (
      <div>
        <div>{
          !this.state.renderCourse.toggle && (
          <div>
            <h2>Courses:</h2>
            { this.props.courses.length ? (<ul>{this.props.courses.map((cObj, i) => {
                let {id, name} = cObj
                return (
                <Course
                  course={name}
                  key={i}
                  id={i}
                  handleClick={this.handleClick}
                />
              )})}</ul>) : (
                <div>No courses yet! Enter one in above</div>
              )}
            <div>
              <CourseForm />
            </div>
          </div>)}
        </div>
        <div>
          {this.state.renderCourse.toggle && (
            <div>
              <button id="goBack" onClick={this.handleClick}>Go back to courses!</button>
              <AssignmentList course={this.state.renderCourse.course} test={this.props.courses}/>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const CourseList = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseList)

export default CourseList;
