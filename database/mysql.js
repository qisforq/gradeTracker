const mysql = require('mysql')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'grade_tracker',
});

db.connect((err)=> {
	if (err) {
		throw(err)
	} else {
		console.log('grade_tracker database connected! =D')
	}
})

module.exports = db;
