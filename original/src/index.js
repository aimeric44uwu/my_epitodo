/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** index.js
*/

const express = require('express');
const app = express();
require('dotenv').config({path: __dirname + '../.env'})
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/user/user.query')(app);
require('./routes/todos/todos.query')(app);
require("./middleware/notFound")(app);

app.get("*", function(req, res) {
    res.redirect("/404");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});