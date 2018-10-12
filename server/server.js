require('./config');
const colors = require('colors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user');

const app = express();
app.use(user);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/coffe', { useNewUrlParser: true })
  .then((response) => {
    const { connections } = response;
    const data = connections[0];
    const {
      states, _readyState,
      name, host,
      port,
    } = data;
    const displayState = states[_readyState];

    switch (_readyState) {
      case 0:
        console.log(`Mongoose State: ${displayState}`.red);
        break;
      case 1:
        console.log(`Mongoose State: ${displayState}`.green);
        break;
      default:
        console.log(`Mongoose State: ${displayState}`.yellow);
        break;
    }
    console.log(`DB_Name: ${name}`.blue, `DB_Host: ${host}:${port}`.cyan);
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT;
app.listen(port, () => {
  console.log('Listening port', port);
});
