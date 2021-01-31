const mongoose = require('mongoose');
const { database } = require('./keys');

//CONEXION
mongoose.connect(database.URI , {
    useNewUrlParser: true,
    useUnifiedTopology : true
}).then((db) => console.log('Conectado :)'))
  .catch((err) => console.log('Error:' , err));

  const db = mongoose.connection;
  db.on('error' , console.error.bind(console, 'Connection error'));
  db.on('open' , () => {
      console.log('Connected');
  });

  module.exports = mongoose;