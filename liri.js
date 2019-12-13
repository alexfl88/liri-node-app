// Requirements for this project

let axios = require("axios");
let Spotify = require('node-spotify-api');
let dotenv = require('dotenv').config();
let moment = require('moment');
let fs = require("fs");

let spotify = new Spotify({
    id: '530a0585c5bb451a9bd515ff61fcb829',
    secret: '2a12031f28cd4d988a68174b53bbd6ee'
});

// let keys = require('keys.js');
// let spotify2 = new Spotify(keys.spotify);

moment().format();


// Perform npm installs and initialize package.json

let command = process.argv[2];
let input = process.argv[3];


// 4 different inputs this can take: concert-this, spotify-this-song, movie-this, do-what-it-says

switch(command){
    case 'concert-this':
    let concertURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
    axios.get(concertURL).then(function(response){
        let data = response.data[0];
        
        let concertData = [
            "----------------------",
            "Artist: " + input,
            "\nVenue: " + data.venue.name,
            "\nLocation: " + data.venue.city + ", " + data.venue.region,
            "\nDate: " + moment(data.datetime).format("MM/DD/YYYY"),
            "----------------------"
        ].join("\n");

        console.log(concertData);
    })
    .catch(function(error){
        console.log(error);
    });

    console.log("concert command test");

    break;




    case 'spotify-this-song':
        spotify.search({ type: 'track' , query: input })
            .then(function(response){
                let data = response.tracks.items[0].album;

                let songData = [
                    "-------------------------",
                    "Artist: " + data.artists[0].name,
                    "\nSong: " + input,
                    "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                    "\nAlbum: " + data.name,
                    "-------------------------"
                ].join("\n\n");

                console.log(songData);
            })
            .catch(function(err){
                console.log(err);
            });
    
    break;




    case 'movie-this':
    console.log("////// Movie Info Below //////");
        axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function(response){
            console.log(response.data.Title);
            console.log(response.data.Year);
            console.log(response.data.Rated);
            console.log(response.data.Country);
            console.log(response.data.Language);
            console.log(response.data.Plot);
            console.log(response.data.Actors);
        });
    
    break;



    case 'do-what-it-says':
    fs.readFile("random.txt", "UTF-8", function(error,data){
        if (error){
            console.log("Error; " + error);
        } else {
            let choice = data.split(",");

            console.log(choice[1]);

            // Run this through spotify
            spotify.search({ type: 'track' , query: choice[1] })
            .then(function(response){
                let data = response.tracks.items[0].album;

                let songData = [
                    "-------------------------",
                    "Artist: " + data.artists[0].name,
                    "\nSong: " + choice[0],
                    "\nSpotify Link: " + data.artists[0].external_urls.spotify,
                    "\nAlbum: " + data.name,
                    "-------------------------"
                ].join("\n\n");

                console.log(songData);
            })
            .catch(function(err){
                console.log(err);
            });
        }
    })
    

    
    console.log("filesystem command test");
    break;



    default:
    console.log("Invalid command");
};