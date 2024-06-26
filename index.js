const express = require("express"); // including express in the app
const { request } = require("http");
const path = require("path"); // module to help wih file paths
const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb
const axios = require("axios");
const dotenv = require("dotenv");
const app = express();
const port = process.env.port || "8888";
const cors = require("cors");

dotenv.config();

//DB values
const dbUrl = process.env.DATABASE_URL;
const client = new MongoClient(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

// Route for store
app.get("/projects", async (request, response) => {
  let storeData = await getProjects();
  response.json(storeData);
});

//Function to get all games in the games collection.
async function getProjects() {
  db = await connection();
  let results = db.collection("projects").find({});
  let res = await results.toArray();
  return res;
}

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

//MONGODB FUNCTIONS
async function connection() {
  db = client.db("portfolio");
  return db;
}
