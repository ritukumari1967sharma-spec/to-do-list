const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let collection;

async function dbconnectionTodos() {
  if (!collection) {
    await client.connect();
    const db = client.db("todoApp");
    collection = db.collection("todos");
  }
  return collection;
}

module.exports = dbconnectionTodos;