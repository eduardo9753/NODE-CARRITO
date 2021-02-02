const adminController = {};

const passport = require('passport');


adminController.adminLogin = (req , res) => {
  res.render('admin/admin/login.hbs');
}

adminController.adminSignin = passport.authenticate('local.signin', {
  failureRedirect: '/admin/admin/login',
  successRedirect: '/admin/admin/home', //VIEW HOME
  failureFlash: true
});


adminController.home = (req, res) => {
  res.render('admin/admin/home.hbs');
}

adminController.logout = (req, res) => {
  req.logout();
  res.redirect('/user/signin');
}

module.exports = adminController;