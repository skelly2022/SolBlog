const express = require("express");
const axios = require("axios");
var cors = require("cors");
const router = express.Router();
const app = express();
const port = process.env.PORT || 2000;

app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

router.get("/get", cors(), async (req, res) => {
  const data = await axios
    .post(
      "https://chessblunders.org/api/blunder/get",
      {
        type: "explore",
      },
      {
        headers: {
          "Content-type": "application/json;",
        },
      }
    )
    .then((data) => {
      return data.data;
    });

  res.json(data);
});

app.use("/get", router);
