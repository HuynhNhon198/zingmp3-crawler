const { GET_Song } = require("./services/songSV.js");
const { GET_Top100 } = require("./services/top100.js");
const { GET_Artist } = require("./services/artistsSV.js");
const express = require("express");
const cors = require("cors");

const api = express();
var port = process.env.PORT || 1998;

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
  const resp = await GET_Artist();
  res.json(resp);
});

api.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
