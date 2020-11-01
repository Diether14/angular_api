const mysql = require('mysql'),
    db = "weendi",
    host = 'localhost:3306'
    // host = '192.168.254.100:3306'

const connection = mysql.createConnection({
    host: host,
    user: `root`,
    password: '',
    database: db
})

connection.connect(()=>{
    console.log("Connected to the database!")
    console.log(`Current database: ${db}`)
});