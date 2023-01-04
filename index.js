const express = require('express');
const path = require('path');
const getData = require("./getData");

const app = express();

app.set('view engine', 'ejs');

const PORT = 5000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, error => {
  error ? console.log('error: ', error) : console.log(`Listening port ${PORT}`)
});

app.use(express.static(__dirname + '/styles'), express.static(__dirname + '/img'));

app.get('/', getData, async (req, res) => {

  const dataObj = req.data;


  const record = dataObj.record;
  const items = dataObj.items;
  console.log('record: ', record)

  res
    .status(200)
    .render(createPath('index'), { record, items });
});