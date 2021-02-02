const express         = require('express');
const session         = require('express-session');
const morgan          = require('morgan');
const flash           = require('connect-flash');
const methodOverride  = require('method-override');
const multer          = require('multer');
const { v4 : uuidv4 } = require('uuid');
const path            = require('path');
const exhbs           = require('express-handlebars');
const app             = express();


//MANEJO DE SESSIONES Y PASSPORT
const MongoStore      = require('connect-mongo')(session);//GUARDAR SESSIONES EN MONGO DB
const passport        = require('passport');//INICIANDO PASSPORT
const connt           = require('./database/database'); //INSTANCIA DE MI DB PARA MONGOSTORE

//IMPORTACIONES
const indexRouter     = require('./routers/index.router');
const pageRouter      = require('./routers/page.router');
const categoryRouter  = require('./routers/category.router');
const productRouter   = require('./routers/product.router');
const cartRouter      = require('./routers/cart.router');
const userRouter      = require('./routers/user.router');
const adminRouter     = require('./routers/admin.router');
const { isAuthenticated } = require('./helpers/auth') ;
const { firtPagina , paginationProduct , paginationCateries,lastPagina } = require('./helpers/handlebars');
require('./database/database');
require('./config/passport');


//SETTING SERVER
app.set('port' , process.env.PORT || 5009);


//SETTING VIEWS
app.set('views' , path.join(__dirname , 'views'));
app.engine('.hbs' , exhbs({
    defaultLayout : 'main',
    layoutsDir    : path.join(app.get('views') , 'layouts'),
    partialsDir   : path.join(app.get('views') , 'partials'),
    extname       : '.hbs',
    helpers       : { isAuthenticated , firtPagina , paginationProduct , paginationCateries , lastPagina } //no es necesario llamar esta funcion
}));
app.set('view engine' , '.hbs');


//MIDDLEWARES
app.use(methodOverride('_method'));//PUT DELETE
app.use(express.urlencoded({ extended : false }));
app.use(morgan('dev'));
const storeProduct = multer.diskStorage({
    destination : path.join(__dirname , '/public/products/'),
    filename    : (req , file , cb) => {
        cb(null , uuidv4() + path.extname(file.originalname).toLowerCase());
    }
})
const uploadProduct = multer({ storage : storeProduct, dest : path.join(__dirname , '/public/products/')}).single('imageProduct');
app.use(uploadProduct);


//SSESION Y FLASH
app.use(session({
    secret : process.env.SESSION_SECRET || 'secret' ,
    resave : false ,
    saveUninitialized : false ,
    store  : new MongoStore({ mongooseConnection : connt.connection })//SAVE SESSION EN LA BD
}));
app.use(passport.initialize()); //INICIANDO PASSPORT
app.use(passport.session());    //INICIANDO PASSPORT
app.use(flash());


//VARIABLES GLOBALES
app.use((req, res, next) => {
    res.locals.success  = req.flash('success');
    res.locals.error    = req.flash('error');
    res.locals.cart     = req.session.cart;  //VARIABLE QUE ALMACENA MIS PRODUCTOS
    res.locals.user     = req.user || null;  //GUARDAMOS AL USER EN SESSION
    next();
})


//MANEJO DE RUTAS
app.use('/' , indexRouter);
app.use('/' , pageRouter);
app.use('/' , categoryRouter);
app.use('/' , productRouter);
app.use('/' , cartRouter);
app.use('/' , userRouter);
app.use('/' , adminRouter);


//STATIC FILR
app.use(express.static(path.join(__dirname , 'public')))
console.log(path.join(__dirname , 'public'));


//SETTING LISTEN
app.listen(app.get('port') , () => {
    console.log('SERVER RUNNING : ' , app.get('port'));
});
