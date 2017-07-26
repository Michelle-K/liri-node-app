var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var omdb = require("omdb");
var fs = require("fs");


if (process.argv[2] === "my-tweets"){
	var params = {screen_name: "eat_drink_code", count:20};
	var client = new twitter(keys.twitterKeys);

	client.get('statuses/user_timeline',params, function(error, tweets, response) {
  		if(error){
  			console.log(error);
  		}
  		
  		else{
  			for(i = 0 ; i < tweets.length; i++) {
  				console.log(tweets[i].text);
  				
  			}
  		}
	});	
}

if (process.argv[2] === "spotify-this-song" && process.argv[3]){
	var song = process.argv[3];
	var params = {type: "track",query: song, limit: 5};
	var client = new Spotify(keys.spotifyKeys);

	client.search(params, function(err,data){
		if (err) {
    		return console.log('Error occurred: ' + err);
 		 }
 		else{
			for(i=0;i<5;i++){
 				console.log("--------------------------------------------");
 				console.log("Artist: " + data.tracks.items[i].album.artists[0].name);
 				console.log("Song: " + data.tracks.items[i].name);
 				console.log("Preview Link: " + data.tracks.items[i].preview_url);
 				console.log("Album: " + data.tracks.items[i].album.name);
 				console.log("--------------------------------------------");
 			}
 		}
	});
}
if (process.argv[2] === "spotify-this-song" && process.argv[3] === undefined){
	var song = "The Sign ace of base";
	var params = {type: "track",query: song, limit: 1};
	var client = new Spotify(keys.spotifyKeys);

	client.search(params, function(err,data){
		if (err) {
    		return console.log('Error occurred: ' + err);
 		 }
 		else{
 			for(i=0;i< 1;i++){
 				console.log("--------------------------------------------");
 				console.log("Artist: " + data.tracks.items[i].artists[0].name);
 				console.log("Song: " + data.tracks.items[i].name);
 				console.log("Preview Link: " + data.tracks.items[i].preview_url);
 				console.log("Album: " + data.tracks.items[i].album.name);
 				console.log("--------------------------------------------");
 			}
 		}
 	});
}

if (process.argv[2] === "movie-this"){
	var movie = process.argv[3];
	var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&r=json&apikey=40e9cece";

	request(queryURL, function(error, response, body) {
	    if (!error && response.statusCode == 200) {
			
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Release Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
			console.log("Country Produced: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);

     		var movieData = "\nTitle: " + JSON.parse(body).Title + "\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry Produced: " + JSON.parse(body).Country + "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors;
     		
     		fs.appendFile("log.txt", movieData, function(err) {
       			if (err) {
         			console.log(err);
        		}
       			 else {
          			console.log("Content Added!");
        		}
 			});
    
   
		}
  	});
}

if (process.argv[2] === "do-what-it-says"){
	fs.readFile("random.txt", "utf8", function(error, data){
	
		dataArray=data.split(",");
		song = dataArray[1];
		var params = {type: "track",query: song, limit: 5};
	
		
		var client = new Spotify(keys.spotifyKeys);
		client.search(params, function(err,data){
		if (err) {
    		return console.log('Error occurred: ' + err);
 		 }
 		else{
 			for(i=0;i< 1;i++){
 				console.log("--------------------------------------------");
 				console.log("Artist: " + data.tracks.items[i].artists[0].name);
 				console.log("Song: " + data.tracks.items[i].name);
 				console.log("Preview Link: " + data.tracks.items[i].preview_url);
 				console.log("Album: " + data.tracks.items[i].album.name);
 				console.log("--------------------------------------------");
 			}
 		}
 	});

	});
}