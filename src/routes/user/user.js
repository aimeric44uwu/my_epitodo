/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** user.js
*/

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
require('dotenv').config()
const db = require("../../config/db");

exports.register = (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.firstname || !req.body.password)
        return res.status(401).send({"msg": "Invalid Credentials"});

    let user = {
        email: req.body.email,
        name: req.body.name,
        firstname: req.body.firstname,
        password: req.body.password
    }

    db.query(`SELECT * FROM user WHERE email=?`,user.email,(err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"});

        if (result.length != 0)
            return res.status(409).send({ "msg" : "Account already exists" });

        bcrypt.hash(user.password, 8).then((hash) => {
            user.password = hash;
        }).then(() => {
            db.query("INSERT INTO user SET ?", user,(err,result) => {
                if (err)
                    return res.status(500).send({ "msg": "Internal server error"})

                db.query('SELECT * FROM user WHERE email=?', user.email, (err,result) => {
                    if(err)
                        return res.status(500).send({ "msg": "Internal server error"})

                    var token = jwt.sign({ id: result[0].id }, process.env.SECRET);
                    return res.status(200).send({"token": token});
                })
          })
        }).catch(err => {
            return res.status(500).send({"msg": "Internal server error"});

        }); 
    })
};

exports.login = (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(401).send({"msg": "Invalid Credentials"});

    db.query(`SELECT * FROM user WHERE email=?`, req.body.email, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send({ "msg": "Internal server error"});
        }
        if (!result[0])
            return res.status(401).send({"msg": "Invalid Credentials"});

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            result[0].password
        );

        if (!passwordIsValid)
            return res.status(401).send({"msg": "Invalid Credentials"});

        var token = jwt.sign({ id: result[0].id }, process.env.SECRET);
        return res.status(200).send({"token": token});

    })
};

exports.user = (req, res, next) => {
    if (!req.user)
        return res.status(401).send({"msg": "Not found"});

    return res.status(200).send({
        "id": req.user.id,
        "email": req.user.email,
        "password": req.user.password,
        "created_at": req.user.created_at,
        "firstname": req.user.firstname,
        "name": req.user.name
    });
}


exports.usertodos = (req, res) => {
    if (!req.user)
        return res.status(401).send({"msg": "Not found"});

    db.query(`SELECT * FROM todo WHERE user_id=?`, req.user.id, (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})

        if (!result)
            return res.status(401).send({"msg": "Not found"});

        return res.status(200).send(result);
    })
}

exports.userbyemailorid = (req, res) => {
    if (!req.params.emailorid)
        return res.status(401).send({"msg": "Bad parameters"});

    const emailorid = req.params.emailorid;
    db.query(`SELECT * FROM user WHERE email=? OR id=?`, [ emailorid, emailorid ], (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"})

        if (!result[0])
            return res.status(401).send({"msg": "Not found"});

        return res.status(200).send({
            "id": result[0].id,
            "email": result[0].email,
            "password": result[0].password,
            "created_at": result[0].created_at,
            "firstname": result[0].firstname,
            "name": result[0].name
        });
    })
}

exports.userupdate = (req, res) => {
    if (!req.body.email || !req.body.password || !req.body.firstname || !req.body.name || !req.params.id)
        return res.status(401).send({"msg": "Bad parameters"});

    const query_arg = `UPDATE user SET email=?, password=?, name=?, firstname=? WHERE id=?`;
    var password = req.body.password;

    bcrypt.hash(req.body.password, 8).then((hash) => {
        password = hash;
    }).then(()=>{
        db.query(query_arg, [req.body.email, password, req.body.name,
            req.body.firstname, req.params.id], (err, result) => {
            if (err)
                return res.status(500).send({ "msg": "Internal server error"});

        })
        db.query(`SELECT * FROM user WHERE id=?`, req.params.id, (err, result) => {
            if (err)
                return res.status(500).send({ "msg": "Internal server error"});

            if (!result[0]) 
                return res.status(401).send({"msg": "Not found"});

            return res.status(200).send({
                "id": result[0].id,
                "email": result[0].email,
                "password": result[0].password,
                "created_at": result[0].created_at,
                "firstname": result[0].firstname,
                "name": result[0].name
            });
        })
    }).catch(err => {
        return res.status(500).send({"msg": "Internal server error"});

    });
}

exports.userdelete = (req, res) => {
    if (!req.params.id)
        return res.status(401).send({"msg": "Bad parameters"});

    db.query(`DELETE FROM user WHERE id = ?`, req.params.id, (err, result) => {
        if (err)
            return res.status(500).send({ "msg": "Internal server error"});
        return res.status(200).send({"msg" : `Successfully deleted record number : ${req.params.id}`});
    })
}
