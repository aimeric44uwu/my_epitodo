
exports.register = (req, res) => {
    return res.render('register.ejs');
}

exports.login = (req, res) => {
    return res.render('login.ejs');
}

exports.user = (req, res) => {
    return res.render('userp.ejs');
}

exports.usertodos = (req, res) => {
    return res.render('todosp.ejs');
}

exports.userupdate = (req, res) => {
    return res.render('userupdate.ejs');
}

exports.userdelete = (req, res) => {
    return res.render('userdelete.ejs');
}

exports.fourohfour = (req, res) => {
    return res.render('404.ejs');
}

