const functions = require("firebase-functions");
const { GET_Song } = require("./services/songSV.js");
const { GET_Top100 } = require("./services/top100.js");
const { GET_Artists } = require("./services/artistsSV.js");
const { GET_Artist } = require("./services/artistSV.js");
const express = require("express");
const cors = require("cors");

const api = express();

api.use(
  cors({
    origin: ["*"],
  })
);

api.get("/get-song", async (req, res) => {
  // res.send('ok')
  const { id, alias } = req.query;
  const resp = await GET_Song(id, alias);
  res.json(resp);
});

api.get("/top100", async (req, res) => {
  // res.send('ok')
  const { type } = req.query;
  const resp = await GET_Top100(type);
  res.json(resp);
});

api.get("/get-artists", async (req, res) => {
  // res.send('ok')
  const resp = await GET_Artists();
  res.json(resp);
});

api.get("/get-artist/:alias", async (req, res) => {
  // res.send('ok')
  const resp = await GET_Artist(req.params.alias);
  res.json(resp);
});

exports.api = functions.https.onRequest(api);
