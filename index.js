const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let newtask = { taskId, text, priority };
  tasks.push(newtask);
  res.json(tasks);
});

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

function assendingorder(a1, a2) {
  return a1.priority - a2.priority;
}

app.get('/tasks/sort-by-priority', (rq, res) => {
  let result = tasks.sort(assendingorder);
  res.json(tasks);
});

function updatepriority(taskId, priority) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    }
  }
  return tasks;
}

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = parseInt(req.query.priority);
  let result = updatepriority(taskId, priority);
  res.json(result);
});

function updatetext(taskId, text) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    }
  }
  return tasks;
}

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let result = updatetext(taskId, text);
  res.json(result);
});

function deletetask(id, taskId) {
  return id.taskId != taskId;
}

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((id) => deletetask(id, taskId));
  res.json(result);
});

function filterbypriority(id1, priority) {
  return id1.priority == priority;
}

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((id1) => filterbypriority(id1, priority));
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
