import React, { Component } from 'react';

const Course = ({course, id, handleClick}) => {
  // const handleClick = () => {
  //   console.log('ca-lick!');
  // };

  return (
    <li>
      <div
        onClick={handleClick}
        id={id}
        >
        {course}
      </div>
    </li>
  );
}

export default Course;



// Final grades will be based on the following:
// • Attendance & Participation (15%)
// • Reflection Papers (35%)
// • Creative Paper (15%)
// • Research Paper (15%)
// • Final Exam (20%)
