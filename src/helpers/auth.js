const helpers = {};

//EL ADMIN PUEDE ENTRAR TAMBIEN AL GENERAL
helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'START SESSION');
        req.logout();
        res.redirect('/user/signin');
    }
}


//SOLO EL ADMIN PUEDE ENTRAR A SU HOME
helpers.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && res.locals.user.admin === 0) {
        return next();
    } else {
        req.flash('error', 'START SESSION ADMIN!!!');
        req.logout();
        res.redirect('/admin/admin/login');
    }
}

module.exports = helpers;