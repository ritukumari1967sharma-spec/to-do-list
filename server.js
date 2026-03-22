const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

const todos = [
  {
    task_title: "task-1",
    description: "Do one productive task",
    status: "Not Done",
  },
  { task_title: "task-1", description: "Read a new book", status: "Not Done" },
  { task_title: "task-1", description: "Do some yoga", status: "Not Done" },
];

const filepath = path.join(__dirname, "index.html");

app.get("/", (req, res) => {
  res.sendFile(filepath);
});

app.get("/tasks", (req, res) => {
  res.json(todos);
});

app.post("/tasks", (req, res) => {
  const { task_title, status } = req.body;

  const newTask = {
    id: todos.length + 1,
    task_title,
    status,
  };

  todos.push(newTask);
app.post('/add' , (req,res) =>{
    res.send("add");
})
app.get('/c' , (req,res) =>{
    res.sendFile(savepath);
})

  res.status(201).json(newTask);
});

app.listen(8000, () => {
  console.log(`listen at http://localhost:${8000}`);
});
