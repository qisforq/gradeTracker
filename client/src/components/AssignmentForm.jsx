import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addAssignment} from '../redux/actions/index.js';


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



class ConnectedAssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      weight: '',
      toggleNameError: false,
      toggleWeightError: false,
      toggleAdd: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAssignments = this.getAssignments.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      toggleWeightError: false,
      toggleNameError: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.weight && this.state.weight <= 100) {
      if (this.state.title) {
        axios.post('/assignments', {
          name: this.state.title,
          weight: this.state.weight,
          course_id: this.props.courseId
        }).then((response) => {
          console.log(response, 'axios response for assignmentform!');
          this.getAssignments()
          this.setState({
            title: '',
            weight: '',
            toggleAdd: !this.state.toggleAdd
          });
          // console.log('...', ,'...');
        }).catch((error) => {
          console.log(error, 'axios error');
        });
      } else {
        this.setState({
          toggleNameError: true,
        })
      }
    } else {
      this.setState({
        toggleWeightError: true,
      })
    }
  }

  getAssignments() {
    axios.get('/assignments')
    .then((response) => {
      console.log('response!', response);
      response.data.map(e => {
        let alreadyExists = this.props.assignments.find((el) => el.name === e.name)
        if (!alreadyExists) {
          this.props.addAssignment(e)
        }
        // this.props.addAssignment(Object.values(e)[0])

      })
    })
    .catch((err) => {
      console.log('the error is...', err);
    });
  }

  toggleAdd() {
    this.setState({
      toggleAdd: !this.state.toggleAdd
    })
  }

  componentWillMount() {
    this.getAssignments();
    console.log('this.props first time:', this.props, '<<');

  }

  // componentDidUpdate() {
  //   console.log('this.props:', this.props, '<<');
  // }

  render() {
    if (!this.state.toggleAdd) {
      return (<button id="goBack" onClick={this.toggleAdd}>Add an assignment for {this.props.courseName}</button>)
    } else {
      return (
        <div>
          <h4>Add an assignment for {this.props.courseName}:</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="title"
              value={this.state.title}
              placeholder="Assignment name"
              onChange={this.handleChange}
            />
            <input
              type="number"
              id="weight"
              value={this.state.weight}
              placeholder="Percentage of grade"
              onChange={this.handleChange}
            />
            <button type="submit" onClick={this.handleSubmit}>Add Assignment for {this.props.courseName}</button>
          </form>
          {this.state.toggleWeightError && (<h6>You have to enter a number between 1 and 100!</h6>)}
          {this.state.toggleNameError && (<h6>You have to enter a name first!</h6>)}
        </div>
      );
    }
  }
}

const AssignmentForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedAssignmentForm);
export default AssignmentForm;
