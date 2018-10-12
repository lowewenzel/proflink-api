const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('../index.route');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(cors());

app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: 'profl.ink API. Visit https://docs.profl.ink/ on how to use this API. You must be authenticated in order to use api.profl.ink.' });
});

module.exports = app;
