import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addCourse} from '../redux/actions/index.js';


const mapStateToProps = (state) => {
  return {
    assignments: state.assignments
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCourse: (course) => dispatch(addCourse(course))
  };
};


class ConnectedCalculateGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleCalc: false,
      toggleError: false,
      totalGrade: '',
    };
    this.handleUpdate = this.handleUpdate.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.convertScore = this.convertScore.bind(this);
  }

  calculateGrades() {
    let totalWeight = 100;
    let totalGrade = (this.props.assignments.reduce((acc, el) => {
      if (this.props.courseId === el.course_id) {
        // console.log("grade:", el.grade);
        if (el.grade > 0 && el.grade <= 100) {
          return acc + (el.grade * el.weight);
        } else {
          totalWeight -= el.weight;
          return acc;
        }
      } else {
        return acc;
      }
    }, 0) / totalWeight)

    this.setState({
      totalGrade: totalGrade
    })
  }

  handleUpdate(e) {
    let calculateWeight = this.props.assignments.reduce((acc, el) => {
      if (this.props.courseId === el.course_id) {
        return acc + el.weight
      } else {
        return acc;
      }
    }, 0)

    // console.log("weight:", this.props.assignments);
    if (calculateWeight === 100) {
      this.calculateGrades()
      this.setState({
        toggleCalc: true
      })
    } else {
      this.setState({
        toggleError: true
      })
    }

  }

  convertScore(score) {
    var grade = '';
    if (score < 0 || score > 100) {
      return 'INVALID SCORE';
    }

    if (Math.floor(score/10) === 10) {
      return 'A+';
    } else if (Math.floor(score/10) === 9) {
      grade = 'A';
    } else if (Math.floor(score/10) === 8) {
      grade = 'B';
    } else if (Math.floor(score/10) === 7) {
      grade = 'C';
    } else if (Math.floor(score/10) === 6) {
      grade = 'D';
    } else if (score < 60) {
      return 'F';
    }

    if (Number(score.toString()[1]) < 3) {
      return grade + '-';
    } else if (Number(score.toString()[1]) > 7) {
      return grade + '+';
    }

    return grade;
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.assignments.length === this.props.assignments.length) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  //
  //   // if (nextProps.assignments.length === this.props.assignments.length) {
  //   //   return true;
  //   // } else {
  //   //   return false;
  //   // }
  //
  //   // console.log('nextState', nextState.totalGrade);
  //   // console.log('this.state', this.state.totalGrade);
  //   // let should = !(nextState.totalGrade === this.state.totalGrade);
  //   // console.log("should?", should);
  //   // return should;
  // }

  // componentWillUpdate(nextProps) {
  //   if (nextProps.assignments.length === this.props.assignments.length) {
  //     this.handleUpdate()
  //   }
  // }


  componentWillReceiveProps(nextProps) {
    if (nextProps.assignments.length === this.props.assignments.length) {
      this.handleUpdate()
    }
  }

  componentDidMount() {
    setTimeout(this.props.addCourse, 100)
  }


  render() {
    return (
      <div>
        <br />
        {/* <button onClick={this.handleUpdate}>Calculate Grades</button> */}
        <div>
          {this.state.toggleCalc && (
            <div> {this.state.totalGrade ? (<label>
              Your current grade for this class is:&nbsp;
              <strong>{
                this.convertScore(this.state.totalGrade)
                }</strong>!
            </label>): (<div>Add some grades to see your current grade!</div>)}

            </div>
          )}
        </div>
        {/* <div>{this.state.toggleError &&
          <div>Total weight of assignments must equal 100!</div>
        }</div> */}
      </div>
    );
  }
}

const CalculateGrades = connect(mapStateToProps, mapDispatchToProps)(ConnectedCalculateGrades);
export default CalculateGrades;
