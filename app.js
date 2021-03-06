require('dotenv').config();

const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();
const router = require('./src/router');
const api = require(`./src/api/${process.env.API_VERSION}`);

const hbs = exphbs.create({
  layoutsDir: "./src/templates",
  partialsDir: "./src/templates/partials"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static('./src/templates'));

app.set('views', './src/templates');
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(cookieParser());

app.use(
  session({
    key: 'user_sid',
    secret: 'randomsecret123',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }

  next();
});

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode < 400
    }, stream: process.stderr
}));

app.use(morgan('dev', {
    skip: function (req, res) {
        return res.statusCode >= 400
    }, stream: process.stdout
}));

app.use('/', router);
app.use(`/api/${process.env.API_VERSION}`, api);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that page!")
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Listening on port: ' + app.get('port'));
});

module.exports = app;
