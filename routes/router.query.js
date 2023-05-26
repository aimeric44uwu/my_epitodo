const renderer = require("./router");

module.exports = function(app)
{
    app.get("/404", renderer.fourohfour);
    app.get("/register", renderer.register);
    app.get("/login", renderer.login);
    app.get("/userp", renderer.user);
    app.get("/userp/todos", renderer.usertodos);
    app.get("/upuser", renderer.userupdate);
    app.get("/deluser", renderer.userdelete);
};
