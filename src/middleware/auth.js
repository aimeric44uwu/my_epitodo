/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** auth.js
*/

const db = require("../config/db.js");
const User = db.user;
require('dotenv').config()
var jwt = require('jsonwebtoken');


function checkAuthenticated(req, res, next) {
    try {
        const token = req.headers.token;
        var decoded = null;
        if (!token) {
            return res.status(401).send({"msg": "No token , authorization denied"});
        }
        try {
            decoded = jwt.verify(
                token,
                process.env.SECRET
            );
        } catch (err) {
            return res.status(401).send({"msg": "Token is not valid"});
        }
        if (!decoded)
            return res.status(401).send({"msg": "Not authorized"});
        db.query(`SELECT * FROM user WHERE id = ?`, decoded.id, (err, result) => {
            if (err)
                return res.status(500).send({ "msg": "Internal server error"});
            if (!result[0])
                return res.status(401).send({"msg": "Token is not valid"});
            req.user = result[0];
            return next();
        })
    } catch (err) {
        return res.status(401).send({"msg": "Internal server error"});        
    }
}

module.exports = checkAuthenticated;