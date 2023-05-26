/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** todos.query.js
*/

const checkAuthenticated = require("../../middleware/auth.js");
const todosactions = require("./todos.js");

module.exports = function(app)
{
    app.get("/todos", checkAuthenticated, todosactions.gettodos);
    app.get("/todos/:id", checkAuthenticated, todosactions.gettodoid);
    app.post("/todos", checkAuthenticated, todosactions.posttodos);
    app.put("/todos/:id", checkAuthenticated, todosactions.puttodosid);
    app.delete("/todos/:id", checkAuthenticated, todosactions.deletetodosid);
};