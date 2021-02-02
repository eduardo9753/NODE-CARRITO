const helpers = {};

helpers.isAuthenticated = (req , res , next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error' , 'START SESSION');
    res.redirect('/user/signin');
}



module.exports = helpers;