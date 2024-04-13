const express = require("express");
const { getQuery, getSearch } = require("../controllers/data.js");

const authRouter = express.Router();

authRouter.get("/query/:id", getQuery);
authRouter.get("/search/:id", getSearch);

module.exports = authRouter;