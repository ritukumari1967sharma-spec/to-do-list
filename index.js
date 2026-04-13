const express = require("express");
const path = require("path");
const { ObjectId } = require("mongodb");
const dbconnectionTodos = require("./dbconnection");

const app = express();
app.use(express.json());

const PORT = 4040;
const homeurl = path.join(__dirname, "home.html");

let collection;

// ✅ Connect DB once
(async () => {
  try {
    collection = await dbconnectionTodos();
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ DB Connection Failed:", err);
  }
})();

// ✅ Routes

// Home page
app.get("/", (req, res) => {
  res.sendFile(homeurl);
});

// Get all tasks
app.get("/task", async (req, res) => {
  try {
    const data = await collection.find().toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single task
app.get("/task/:id", async (req, res) => {
  try {
    const data = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create task
app.post("/task", async (req, res) => {
  try {
    const { task_title, status } = req.body;

    if (!task_title || !task_title.trim()) {
      return res.status(400).json({ error: "Task title required" });
    }

    await collection.insertOne({
      task_title,
      status: status || "Not Done",
    });

    res.json({ msg: "Task Added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task
app.put("/task/:id", async (req, res) => {
  try {
    const { task_title, status } = req.body;

    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          ...(task_title && { task_title }),
          ...(status && { status }),
        },
      }
    );

    res.json({ msg: "Task Updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete task
app.delete("/task/:id", async (req, res) => {
  try {
    await collection.deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({ msg: "Task Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// About
app.get("/about", (req, res) => {
  res.send("This is our About page");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});