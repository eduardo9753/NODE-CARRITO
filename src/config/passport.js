const passport     = require('passport');
const LocaStrategy = require('passport-local').Strategy;

const User         = require('../models/User');


//LOGEO DE USUARIOS YA REGISTRADOS(2)
passport.use('local.signin' , new LocaStrategy({
    usernameField : 'email' ,   //caja input
    passwordField : 'password', //caja input
    passReqToCallback : true
} , async (req, email , password , done) => {
    console.log('DATA FORM SIGNIN:' , req.body);
    const user = await User.findOne({ email : email });
    if(!user){
        return done(null , false , { message : 'NOT USER FOUNT'});
    } else {
        const match = await user.macthPass(password);
        if(match){
            return done(null , user , req.flash('success' , 'WELCOME: ' , JSON.stringify(user.username)));
        } else {
            return done(null , false , { message : 'PASSWORD INCORRECT...'});
        }
    } 
}));


//REGISTRANDO A UN USUARIO (1)
passport.use('local.signup' , new LocaStrategy({
    usernameField : 'username',  //caja input
    passwordField : 'password',  //caja imput
    passReqToCallback : true 
} , async (req, username , password , done) => {
    console.log('DATA USER SIGNUP : ' , req.body);
    const emailUser = await User.findOne({ email : req.body.email});
    if(emailUser){
        req.flash('error : ' , 'El email esta en Uso Actualmente');
    } else {
       //encryptando contraseña
       const newUser    = await User();
       newUser.name     = req.body.name;
       newUser.email    = req.body.email;
       newUser.username = username;
       newUser.admin    = 1;
       newUser.password = await newUser.encryPass(password);
       newUser.save()
              .then(newUser => {
                  return done(null , newUser , req.flash('success' , 'REGISTER COMPLETE'));
              })
    }
}));


passport.serializeUser((user , done) => {
    console.log('SERIALIZEUSER : ' , user);
    done(null , user._id);
});

passport.deserializeUser((_id , done) => {
    console.log('DESERIALIZERUSER : ' , _id);
    User.findById(_id , (err , user) => {
        done(err , user);
    })
});