const userController = {};

const passport = require('passport');


//REGISTRO DE USUARIOS
userController.signupForm = (req, res) => {
    let Page = 'Users'
    res.render('user/signup.hbs' , {Page});
}
userController.signupFormAdd = passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    successRedirect: '/', //VIEW HOME
    failureFlash: true
});


//LOGEO DE USUARIOS
userController.signinForm = (req, res) => {
    /* if(res.locals.user){    //SI HAY UN USUARIO EN SESSION
         res.redirect('/');  //LO DIRIGIMOS AL HOME
     }*/
    let Page = 'Users'
    res.render('user/signin.hbs' , {Page});
}
userController.signinFormAdd = passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    successRedirect: '/', //VIEW HOME CLIENTE
    failureFlash: true
})


userController.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Good Bye User!....:)');
    res.redirect('/user/signin');
}


module.exports = userController;