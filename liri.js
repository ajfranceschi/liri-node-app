const axios = require("axios");
const SpotifyApi = require("node-spotify-api");
const moment = require("moment");
const dotenv = require("dotenv").config();
const keys = require("./keys");
const inputArray = process.argv;
const spotify = new SpotifyApi(keys.spotify);

switch (inputArray[2]) {
  case "concert-this":
    console.log("concert-this");
    break;

  case "spotify-this-song":
    const query = inputArray[3] ? inputArray[3] : "Ace Of Base The Sign";
    spotify
      .search({
        type: "track",
        query: query,
        limit: 1
      })
      .then(data => {
        const track = data.tracks.items[0];
        console.log(`Artist(s): ${track.album.artists[0].name}`);
        console.log(`Song Name: ${track.name}`);
        console.log(`Preview Link: ${track.external_urls.spotify}`);
        console.log(`Album Name: ${track.album.name}`);
      })
      .catch(error => {
        console.log(error);
      });
    break;
  default:
    console.log("Verify your arguments and try again.");
    break;
}
