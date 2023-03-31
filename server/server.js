const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Task = require('./models/task.js');
const Auth = require('./models/auth.js');
const authToken = require('./middleware/authToken.js').authToken;
const crypto = require('crypto');

process.env.ACCESS_TOKEN_SECRET = crypto.randomBytes(50).toString('hex');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User Auth operations
app.post('/user', (req, res) => {
  Auth.addNewUser(req.body)
    .then((id) => res.send(id.insertId.toString()))
    .catch((err) => res.status(404).send('taken'));
});

app.post('/user/login', (req, res) => {
  Auth.loginUser(req.body)
    .then((id) => res.send(id))
    .catch((err) => res.status(404).send('incorrect'));
});

// Task CRUD operations
app.get('/tasks/:userId', authToken, (req, res) => {
  Task.getTasks(req.params.userId)
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(404));
});

app.post('/task', authToken, (req, res) => {
  Task.addTask(req.body)
    .then((id) => res.send(id.toString()))
    .catch((err) => res.status(404))
});

app.delete('/task/:id', authToken, (req, res) => {
  Task.deleteTask(req.params.id)
    .then((response) => res.send(`Task ${id} succesfully deleted`))
    .catch((err) => res.send(err));
})

app.put('/task/description/:id', authToken, (req, res) => {
  Task.updateDescription(req.params.id, req.body.description)
    .then((response) => res.send(`Task ${id} succesfully updated description`))
    .catch((err) => res.send(err));
});

app.put('/task/isComplete/:id', authToken, (req, res) => {
  const isComplete = req.body.isComplete ? 1 : 0;

  Task.updateComplete(req.params.id, isComplete)
    .then((response) => res.send(`Task ${id} succesfully updated completeness`))
    .catch((err) => res.send(err));
})

app.listen(PORT, () => {
  console.log('listening for request at port', PORT);
})