const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const socketIo = require('socket.io')
// const { Server } = require("socket.io");
let io;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  const server = app.listen(PORT, () => console.log('Now listening'));
  io = socketIo(server);
  //const io = socketIO(server)
  io.on('connection', (socket) => {
    console.log('User connected')

    // Think about this as an event listener
    socket.on('chat message', (data, user_name) => {
      // Sends the message to the client
      io.emit('chat message', data, user_name)

    })

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  })
});
