const express = require('express')
const mysqlDb = require('mysql')
const path = require('path')
const handleBars = require('handlebars')
const app = express();

const db = mysqlDb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nishanth',
    database: 'task2'
})
// Require static assets from public folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, '/public'));

app.set('view engine', 'ejs')

app.use(express.json())



app.get('/profiles', (req, res) => {
    const q = "SELECT * FROM profiles"
    db.query(q, (err, data) => {
        if(err) return res.json("Error")
        res.render('index', {values: {data: data}})
    })
    
})

app.post('/addProfile', (req, res) => {
    const q = "INSERT INTO profiles (`name`, `desc`, `phone`, `email`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.desc,
        req.body.phone,
        req.body.email,
    ]
    db.query(q, [values], (err, data) => {
        if(err) return res.json("Error In Insertion " + err);
        return res.json("Succefully added")
    })
})

app.listen(5050, () => {
    console.log('Server is listing at http://localhost:5050/')
})