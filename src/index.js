if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const axios = require("axios");
const app = express();
const insertToken = require("./db");
// the port is set to 8080
const Port = 8080;

// Change the size of the query as desired
const querySize = 3000;

// HTTP endpoint to receive the POST request
app.post("/", async (req, res) => {
  const url = process.env.URL + querySize;
  console.log(url);
  try {
    // making the post req to the server
    const response = await axios.post(url);
    const tokens = await response.data.trim().split("\n");
    // converting the array into a set to remove duplications
    const uniqueTokens = [...new Set(tokens)];
    console.log(uniqueTokens);
    let count = 1;
    for (const token of uniqueTokens) {
      // inserting one token at a time into db
      console.log(count);
      await insertToken(token);
      count++;
    }
    res.status(200).send("Tokens inserted into database");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing the request");
  }
});

app.use(function (req, res, next) {
  let error = new Error("Not Found!");
  error.status = 404;
  next(error);
});
// listening to port 8080
app.listen(Port, () => console.log(`Server started on port ${Port}`));
