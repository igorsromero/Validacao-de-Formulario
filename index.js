const bodyParser = require('body-parser');
var session = require("express-session");
var flash = require("express-flash");
var cookieParser = require("cookie-parser");
const express = require('express')
const app = express()
const port = 8080

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extend: false
}));
app.use(bodyParser.json());
app.use(cookieParser("pasodk"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(flash());

app.get("/", (req, res) => {
    res.render("./index");
});

app.post('/form', function (req, res) {
    var { email, nome, pontos } = req.body;
    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio.";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos.";
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio.";
    }

    if(nome.length < 4){
        nomeError = "O nome é muito pequeno.";
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        res.redirect("/");
    } else {
        res.send("Não há erros.");
    }

});

app.listen(port, (req, res) => {
    console.log(`Servidor rodando!`)
});