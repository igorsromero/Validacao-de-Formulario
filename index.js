const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const port = 8080
var session = require("express-session");
var flash = require("express-flash");

app.set("view-engine", "ejs");

app.use(bodyParser.urlencoded({
    extend: false
}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { segure: true }
}))

app.use(flash());

app.get('/', (req, res) => {
    res.send('Olá, mundo!')
});

app.listen(port, () => console.log(`Servidor rodando!`))