/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** auth.js
*/

const express = require('express');
const router = express.Router();
var database = require('../../config/db');

router.post('/login', function(request, response, next){

    var user_email_address = request.body.user_email_address;
    var user_password = request.body.user_password;
    if (user_email_address && user_password) {
        query = `SELECT * FROM user_login 
                WHERE user_email = "${user_email_address}"`;
        database.query(query, function(error, data){
            if(data.length > 0) {
                for(var count = 0; count < data.length; count++) {
                    if (data[count].user_password == user_password) {
                        request.session.user_id = data[count].user_id;
                        response.redirect("/");
                    } else {
                        response.send('Incorrect Password');
                    }
                }
            } else {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    } else {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});