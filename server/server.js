const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Task = require('./models/task.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/tasks', (req, res) => {
  Task.getTasks()
    .then((tasks) => res.send(tasks))
    .catch((err) => res.status(404));
});

app.post('/task', (req, res) => {
  Task.addTask(req.body)
    .then((id) => res.send(id.toString()))
    .catch((err) => res.status(404))
});

app.delete('/task/:id', (req, res) => {
  Task.deleteTask(req.params.id)
    .then((response) => res.send(`Task ${id} succesfully deleted`))
    .catch((err) => res.send(err));
})

app.put('/task/description/:id', (req, res) => {
  Task.updateDescription(req.params.id, req.body.description)
    .then((response) => res.send(`Task ${id} succesfully updated description`))
    .catch((err) => res.send(err));
});

app.put('/task/isComplete/:id', (req, res) => {
  const isComplete = req.body.isComplete ? 1 : 0;
  
  Task.updateComplete(req.params.id, isComplete)
    .then((response) => res.send(`Task ${id} succesfully updated completeness`))
    .catch((err) => res.send(err));
})

app.listen(PORT, () => {
  console.log('listening for request at port', PORT);
})