const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/mysql.js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

// COURSES                   VVVVVVVVVVVV
app.get('/courses', (req, res) => {
  db.query(`SELECT * FROM courses`, (err, result) => {
    if (err) {
      res.status(500).send('uh oh spaghettio in app.post:/courses');
      throw err;
    }
    // console.log(`(server-side) here's the result!`, result);
    res.send(result)
  })
})

app.post('/courses', (req, res) => {
  console.log(req.body.title, '<<req.body.title');
  db.query(`INSERT INTO courses (name) VALUES ("${req.body.title}");`, (err, result) => {
    if (err) {
      res.status(500).send('uh oh spaghettio in app.post:/courses');
      throw err;
    }
    res.send('added the course!')
  });
});
// COURSES                   ^^^^^^^^^^^^^^^^
// --------------------------------------------
// ASSIGNMENTS                VVVVVVVVVVVV
app.get('/assignments', (req, res) => {
  db.query(`SELECT name, weight, course_id, grade FROM assignments`, (err, result) => {
    if (err) {
      res.status(500).send('uh oh spaghettio in app.post:/assignments');
      throw err;
    }
    // console.log(`(server-side) here's the result!`, result);
    res.send(result)
  });
});

app.post('/assignments', (req, res) => {
  let {name, weight, course_id} = req.body
  console.log(course_id, '<<req.body.name');

  db.query(`INSERT INTO assignments (name, weight, course_id) VALUES ("${name}", ${weight}, ${course_id});`, (err, result) => {
    if (err) {
      res.status(500).send('uh oh spaghettio in app.post:/assignments');
      throw err;
    }
    res.send('added the course!')
  });
});
// ASSIGNMENTS               ^^^^^^^^^^^^^^^^
// --------------------------------------------
// GRADES                VVVVVVVVVVVV
app.put('/grades', (req, res) => {
  db.query(`
    UPDATE assignments
    SET grade = ${req.body.grade}
    WHERE name= "${req.body.name}"
  `, (err, result) => {
    if (err) {
      res.status(500).send('uh oh spaghettio in app.post:/grades');
      throw err;
    }
    res.send(result)
  })
})
// GRADES               ^^^^^^^^^^^^^^^^


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
