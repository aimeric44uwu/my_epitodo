/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** notFound.js
*/

module.exports = function(app)
{

    app.get("/404", usernotFound = (req, res, next) => {
        res.status(404).send({"msg": "Not found"});
    })

};

