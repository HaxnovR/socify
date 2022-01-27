var http = require('http');
var fs = require('fs');
const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config({path:".env"});

// var spotifyApi = new SpotifyWebApi({
//     clientId: process.env.spotify_id,
//     clientSecret: process.env.spotify_secret,
// });

// function myFunction() {
//     document.getElementById("myText").value = "Johnny Bravo";
//     console.log("Debug Test");
// }


// async function getSpotify(){

//     document.getElementById("myText").value = "Johnny Bravo";

//     let qry = "travis";

//     spotifyApi.clientCredentialsGrant().then(
//         function(data) {
//             console.log('token = ' + data.body['access_token']);
    
//             spotifyApi.setAccessToken(data.body['access_token']);
    
//             async function getSearch(){
//                 let resp = await spotifyApi.searchTracks(qry,{ limit: 10, offset: 2 });
//                 let dat = resp.body.tracks.items;
//                 if(dat.length==0){
//                     message.channel.send("No Results Found");
//                     return;
//                 }
//                 dat.forEach(index => {
//                     console.log(index.name);
//                 });
//             }
//             getSearch();
    
//         },
    
    
//         function(err) {
//             console.log('Token Error--->', err);
//         }
    
//     );
// }

function onRequest(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write('File not found!');
        } else {
            response.write(data);
        }
        response.end();
    });
}

http.createServer(onRequest).listen(8000);
