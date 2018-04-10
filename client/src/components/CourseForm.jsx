import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addCourse} from '../redux/actions/index.js';


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

class ConnectedCourseForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      toggleError: false,
      toggleAdd: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCourses = this.getCourses.bind(this);
    this.toggleAdd = this.toggleAdd.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
      toggleError: false
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handleSubmitted!', this.state.title, '<<');
    if (this.state.title) {
      axios.post('/courses', {
        title: this.state.title
      }).then((response) => {
        console.log(response, 'axios response!');
        // this.props.addCourse(this.state.title);
        this.getCourses();
        this.setState({
          title: '',
          toggleAdd: !this.state.toggleAdd
        });
      }).catch((error) => {
        console.log(error, 'axios error');
      });
    } else {
      this.setState({
        toggleError: true
      })
    }
  }

  getCourses() {
    axios.get('/courses')
    .then((response) => {
      response.data.map(e => {
        let alreadyExists = this.props.courses.find((el) => el.name === e.name)
        if (!alreadyExists) {
          // console.log('e:', e);
          // this.props.addCourse(Object.values(e)[1])
          this.props.addCourse(e)
        }
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
    this.getCourses();
  }

  render() {

    if (!this.state.toggleAdd) {
      return (<button id="goBack" onClick={this.toggleAdd}>Add a new course</button>)
    } else {
      return (
        <div>
          <h4>Add course:</h4>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              id="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
          {this.state.toggleError && (<h6>You have to enter a name first!</h6>)}
        </div>
      );
    }


  }
}

const CourseForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedCourseForm);
export default CourseForm;
