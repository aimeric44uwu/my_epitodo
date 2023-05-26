const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3333;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

require('./src/routes/user/user.query')(app);
require('./src/routes/todos/todos.query')(app);
require('./routes/router.query')(app);
require("./src/middleware/notFound")(app);

app.get("*", function(req, res) {
  res.redirect("/404");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

