/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** todos.js
*/

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config()
const db = require("../../config/db");
const exp = require('constants');

exports.gettodos = function(req, res) {
    if (!req.user)
        return res.status(401).send({"msg": "Token is not valid"});

    db.query(`SELECT * FROM todo WHERE user_id=?`, req.user.id, (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})

        if (!result.length > 0)
            return res.status(401).send({"msg": "Not found"});

        return res.status(200).send(result);
    })
}

exports.gettodoid = function(req, res) {
    var todo_id = req.params.id;
    if (!req.user)
        return res.status(401).send({"msg": "Token is not valid"});

    db.query(`SELECT * FROM todo WHERE id=?`, todo_id, (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})

        if (!result.length > 0)
            return res.status(401).send({"msg": "Not found"});

        return res.status(200).send(result);
    })
}

exports.posttodos = function(req, res) {
    if (!req.user)
        return res.status(401).send({"msg": "Token is not valid"});

    if (!req.body.title || !req.body.description || !req.body.due_time || !req.body.status || !req.body.user_id)
        return res.status(401).send({"msg": "Bad parameter"});

    if (req.body.status != "not started" && req.body.status != "todo" &&
    req.body.status != "in progress" && req.body.status != "done")
        return res.status(401).send({"msg": "Bad parameter"});

    const query_var = `INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)`;
    db.query(query_var, [req.body.title,req.body.description,
        req.body.due_time, req.body.status, req.body.user_id], (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})
        db.query(`SELECT * FROM todo WHERE id=?`, result.insertId, (err, result) => {
            if (err)
                return res.status(500).send({ "msg": "Internal server error"})
    
            if (!result.length > 0)
                return res.status(401).send({"msg": "Not found"});
    
            return res.status(200).send(result);
        })
    })

}

exports.puttodosid = function(req, res) {
    if (!req.user)
        return res.status(401).send({"msg": "Token is not valid"});

    if (!req.body.title || !req.body.description || !req.body.due_time
        || !req.body.user_id || !req.body.status || !req.params.id)
        return res.status(401).send({"msg": "Bad parameters"});

    if (req.body.status != "not started" && req.body.status != "todo" &&
        req.body.status != "in progress" && req.body.status != "done")
        return res.status(401).send({"msg": "Bad parameter"});

    const query_arg = `UPDATE todo SET title=?, description=?, due_time=?, user_id=?, status=? WHERE id=?`;

    db.query(query_arg, [req.body.title, req.body.description, req.body.due_time,
        req.body.user_id, req.body.status, req.params.id], (err, result) => {
        if (err)
            return res.status(400).send({ msg : err})
        db.query(`SELECT * FROM todo WHERE id=?`, req.params.id, (err, result) => {
            if (err)
                return res.status(400).send({ msg : err})
    
            if (!result.length > 0)
                return res.status(401).send({"msg": "Not found"});
    
            return res.status(200).send({
                "title": result[0].title,
                "description": result[0].description,
                "due_time": result[0].due_time,
                "user_id": result[0].user_id,
                "status": result[0].status,
            });
        })
    })
    
}

exports.deletetodosid = function(req, res) {
    if (!req.params.id)
        return res.status(401).send({"msg": "Bad parameters"});

    db.query(`DELETE FROM todo WHERE id=?`, req.params.id, (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})

        return res.status(200).send({"msg" : `Successfully deleted record number : ${req.params.id}`});
    })
}
