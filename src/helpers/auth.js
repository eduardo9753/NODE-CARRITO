const helpers = {};

helpers.isAuthenticated = (req , res , next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error' , 'START SESSION');
    res.redirect('/user/signin');
}

helpers.isAdmin = (req, res , next) => {
    if(req.isAuthenticated() && res.locals.user.admin==1){
        next();
    }
    
}


module.exports = helpers;