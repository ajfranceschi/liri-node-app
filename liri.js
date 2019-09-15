const axios = require("axios");
const fs = require('fs');
const SpotifyApi = require("node-spotify-api");
const moment = require("moment");
const dotenv = require("dotenv").config();
const keys = require("./keys");
const inputArray = process.argv;
const spotify = new SpotifyApi(keys.spotify);



const concertThis = (band) => {

};

const spotifyThis = (song) => {
  spotify
    .search({
      type: "track",
      query: song,
      limit: 1
    })
    .then(data => {
      const track = data.tracks.items[0];
      console.log(`
        Artist(s): ${track.album.artists[0].name}\n
        Song Name: ${track.name}\n
        Preview Link: ${track.external_urls.spotify}\n
        Album Name: ${track.album.name}
      `)
    })
    .catch(error => `Error: ${error}`);
};

const movieThis = (movie) => {
  const movieQuery = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&type=movie&t=${movie}`;

  axios.get(movieQuery).then(response => {
    const movie = response.data;
    console.log(`
        Movie Title: ${movie.Title}\n
        Release Year: ${movie.Year}\n
        IMDB Rating: ${movie.Ratings[0].Value}\n
        Rotten Tomatoes Rating: ${movie.Ratings[1].Value}\n
        Production Country: ${movie.Country}\n
        Movie Languages: ${movie.Language}\n
        Movie Plot: ${movie.Plot}\n
        Cast: ${movie.Actors}
      `);
  }).catch(error => `Error: ${error}`);
};

switch (inputArray[2]) {
  case "concert-this":
    console.log("concert-this");
    break;

  case "spotify-this-song":
    const songName = inputArray[3] ? inputArray[3] : "Ace Of Base The Sign";
    spotifyThis(songName);
    break;

  case 'movie-this':
    const movieName = inputArray[3] ? inputArray[3] : 'Mr. Nobody';
    movieThis(movieName);
    break;

  case 'do-what-it-says':
    fs.readFile('./random.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(`Error: ${err}`);
      } else {
        let dataArray = data.split(',');
        console.log(`${dataArray[0]}: ${dataArray[1]}`);
        const query = dataArray[1];

        switch (dataArray[0]) {
          case 'concert-this':
            break;
          case 'spotify-this-song':
            spotifyThis(query);
            break;
          case 'movie-this':
            movieThis(query);
            break;
          default:
            break;
        }
      }
    });
    break;

  default:
    console.log("Verify your arguments and try again.");
    break;
}