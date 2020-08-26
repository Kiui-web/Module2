const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb://localhost/Module2'

mongoose.
  connect(MONGODB_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then( () => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => console.log(`An error ocurred trying to connect to the database ${MONGODB_URI}`, error));

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app terminal');
    process.exit(0);
  })
})
