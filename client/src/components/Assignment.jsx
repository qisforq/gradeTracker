import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {addAssignment} from '../redux/actions/index.js';



const mapStateToProps = (state) => {
  return {
    assignments: state.assignments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAssignment: (assignment) => dispatch(addAssignment(assignment))
  };
};

class ConnectedAssignment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleGradeInput: true,
      grade: '',
      toggleGradeError: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  toggle() {
    this.setState({
      toggleGradeInput: !this.state.toggleGradeInput
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log('handleSubmitted!', this.state.grade, '<<');
    if (this.state.grade && this.state.grade <= 100) {
      axios.put('/grades', {
        grade: this.state.grade,
        name: this.props.assignment.name
      }).then((response) => {
        console.log(response, 'axios response for updating grade!');
        let {name, weight, course_id} = this.props.assignment;
        this.props.addAssignment({
          name: name,
          weight: weight,
          course_id: course_id,
          grade: this.state.grade
        })
      }).catch((error) => {
        console.log(error, 'axios error for updating grade');
      });

      this.toggle();
      this.setState({
        toggleGradeError: false,
      })
    } else {
      this.setState({
        toggleGradeError: true,
      })
    }
  }

  componentDidMount() {
    if (this.props.assignment.grade) {
      this.setState({
        grade: this.props.assignment.grade,
        toggleGradeError: false
      },() => this.toggle())
    }

  }

  render() {
    let {name, weight, course_id, grade} = this.props.assignment;

    return (
    <li>
      <div
        // onClick={this.toggle}
        // id={id}
        >
        <form onSubmit={this.handleSubmit}>
          {name} ({weight}% of total grade)
          <div> <h5>grade: {
            this.state.toggleGradeInput ? (
              <input
                type="number"
                id="grade"
                value={this.state.grade}
                placeholder="Enter grade"
                onChange={this.handleChange}
              />) : (<span onClick={this.toggle}>{this.state.grade}</span>)
            }</h5>
              {this.state.toggleGradeError && (<h6>You have to enter a number between 1 and 100!</h6>)}
          </div>
        </form>

      </div>

    </li>
  )}
};

const Assignment = connect(mapStateToProps, mapDispatchToProps)(ConnectedAssignment);
export default Assignment;

// Final grades will be based on the following:
// • Attendance & Participation (15%)
// • Reflection Papers (35%)
// • Creative Paper (15%)
// • Research Paper (15%)
// • Final Exam (20%)
