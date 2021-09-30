const router = require("express").Router();
require("dotenv").config();
const apiKey = process.env.NATPARKSAPI_KEY;
const natParksURL = `https://developer.nps.gov/api/v1/parks?limit=500`;
const axios = require("axios");

async function getParks() {
  try {
    const response = await axios.get(natParksURL, {
      headers: {
        "X-Api-Key": apiKey,
      },
    });
    console.log(response.data);
  } catch (e) {
    console.error(e);
  }
}

getParks();

module.exports = router;
