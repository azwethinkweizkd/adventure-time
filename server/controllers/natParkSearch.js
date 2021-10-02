require("dotenv").config();
const apiKey = process.env.NATPARKSAPI_KEY;

const natParksURL = `https://developer.nps.gov/api/v1/parks?limit=465`;
const axios = require("axios");

module.exports = {
  async getParks() {
    try {
      const response = await axios.get(natParksURL, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      return response.data.data.map((park) => park.fullName);
    } catch (e) {
      console.error(e);
    }
  },
};
