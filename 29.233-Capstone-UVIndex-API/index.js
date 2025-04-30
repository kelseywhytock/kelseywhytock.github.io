// Project uses OpenUV.io API - https://www.openuv.io/dashboard

import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = 3000;
const API_URL = "https://api.openuv.io/api/v1/uv";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var myHeaders = new Headers();
myHeaders.append("x-access-token", "openuv-4xupwmrma2yl9gq-io");
myHeaders.append("Content-Type", "application/json");

app.get("/", (req, res) => {
     res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
     const { lat, lng } = req.body;

     //const dt = new Date().toISOString();
     //const url = API_URL + "?lat=" + lat + "&lng=" + lng + "&alt=0&dt=" + dt;

     const url = API_URL + "?lat=" + lat + "&lng=" + lng + "&alt=0";
     console.log(url);

     try {
          const response = await fetch(url, {
               method: 'GET',
               headers: myHeaders,
          });

          const data = await response.json();

          res.render("submit.ejs", {
               result: data.result
          });

          console.log("API Response:", data.result);

     } catch (error) {
          res.render("submit.ejs", { result: "Error: " + error.message });
          console.log(error);
     }
});

app.listen(port, () => {
     console.log("Server is running on port " + port);
});
