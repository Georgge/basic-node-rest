require('./config');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/user', (req, res) => {
  res.send('Hello World');
});

app.post('/user', (req, res) => {
  const { body } = req;
  res.json({
    body,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Listening port', port);
});
