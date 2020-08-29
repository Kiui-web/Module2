const expressSession = require("express-session");
const connectMongo = require("connect-mongo")
const mongoose = require("mongoose");

const MongoStore = connectMongo(expressSession)

const session = expressSession({
  secret: process.env.SESSION_SECRET || "super secret (change it)",
  //NO guarda la sesión si no se ha inicializado. Puede que en nuestro caso tenga que ser True, para poder guardar sesión y así usar las Cookies
  saveUninitialized: false,
  cookie: {
    secure: process.env.SESSION_SECURE || false,
    httpOnly: true,
    maxAge: process.env.SESSION_MAX_AGE || 3600000, //milisegundos
  },
  //Esto es para guardar la sesión en nuestra base de datos como req.session como un objeto
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    //Este es el tiempo que queremos guardar las sesiones en nuestro servidor. Habrá que ponerlo alto también. Está en segundos creo...
    ttl: process.env.SESSION_MAX_AGE || 3600,
  }),
});

module.exports = session
