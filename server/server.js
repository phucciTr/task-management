const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/tasks', (req, res) => {
  const tasks = [
    { 'title': 'title1', 'description': 'descr1' },
    { 'title': 'title2', 'description': 'descr2'},
    { 'title': 'title3', 'description': 'descr3'}
  ];

  res.send(tasks);
});

app.listen(PORT, () => {
  console.log('listening for request at port', PORT);
})