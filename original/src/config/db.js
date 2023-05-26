/*
** EPITECH PROJECT, 2022
** epitodo_jevaiskifferceprojet
** File description:
** dj.js
*/

const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
	host : process.env.MYSQL_HOST,
	database : process.env.MYSQL_DATABASE,
	user : process.env.MYSQL_USER,
	password : process.env.MYSQL_ROOT_PASSWORD
});

connection.connect(function(error){
	if(error) {
		throw error;
	} else {
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;