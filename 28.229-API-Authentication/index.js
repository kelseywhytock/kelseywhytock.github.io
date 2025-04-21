import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "kelseyyyy";
const yourPassword = "test";
const yourAPIKey = "7c5fff5e-0f76-4385-aaa9-5b3ba6049618";
const yourBearerToken = "a607ae11-4dc7-4035-b2bd-ec67b4cde352";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    let result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send("Error:", error.message);
  }
});

app.get("/basicAuth", async (req, res) => {
  try {
    let result = await axios.get(API_URL + "/all?page=2", {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
        res.status(404).send("Error:", error.message);
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    let result = await axios.get(API_URL + "/filter", {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
      res.status(404).send("Error:", error.message);
  }
});

const config = {
  headers: { Authorization: "Bearer " + yourBearerToken },
};

app.get("/bearerToken", async (req, res) => {
  try {
    let result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch(error) {
    res.status(404).send("Error:", error.message);
  }
});

app.listen(port, () => {
  console.log("Server is running on port " + port)
});
