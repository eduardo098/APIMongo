const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const jwt = require('./helpers/jwt');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(jwt());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado a la DB con exito");
}).catch(err => {
    console.log("Error al conectarse con la DB.", err);
})
/*
MongoClient.connect('mongodb+srv://eduardo098:tigre2500@cluster0-bbcqy.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('db_items')
})
*/

app.get('/', (req, res) => {
    res.json("Bienvenido");
})

require('./routes/item.routes.js')(app);


app.listen(3000, function() {
    console.log('listening')
})