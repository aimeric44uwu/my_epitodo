/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** user.query.js
*/

const checkAuthenticated = require("../../middleware/auth.js");
const useractions = require("./user.js");

module.exports = function(app)
{

    app.post("/register", useractions.register);
    app.post("/login", useractions.login);
    app.get("/user", checkAuthenticated, useractions.user);
    app.get("/user/todos", checkAuthenticated, useractions.usertodos);
    app.get("/users/:emailorid", checkAuthenticated, useractions.userbyemailorid);
    app.put("/users/:id", checkAuthenticated, useractions.userupdate);
    app.delete("/users/:id", checkAuthenticated, useractions.userdelete);

};