import React, { Component } from 'react';
import axios from 'axios';
import CourseList from './CourseList.jsx';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import store from '../redux/store/index.js';
// import { addAssignment } from '../redux/actions/index.js';

const App = () => (
  <div>
    <label>
      <h1>The Grade Tracker</h1>
    </label>
    <div>
      <CourseList />
    </div>
  </div>
)

export default App;
