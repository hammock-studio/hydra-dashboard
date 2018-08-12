const express = require('express');

const app = express();
const router = require('./src/router');

app.use('/', router);

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Listening on port: ' + app.get('port'));
});
