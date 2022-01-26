const SpotifyWebApi = require('spotify-web-api-node');
const dotenv = require('dotenv').config({path:".env"});

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotify_id,
    clientSecret: process.env.spotify_secret,
});


async function getSpotify(){

    let qry = document.getElementById('textbox_id').value

    spotifyApi.clientCredentialsGrant().then(
        function(data) {
            console.log('token = ' + data.body['access_token']);
    
            spotifyApi.setAccessToken(data.body['access_token']);
    
            async function getSearch(){
                let resp = await spotifyApi.searchTracks(qry,{ limit: 10, offset: 2 });
                let dat = resp.body.tracks.items;
                if(dat.length==0){
                    message.channel.send("No Results Found");
                    return;
                }
                dat.forEach(index => {
                    console.log(index.name);
                });
            }
            getSearch();
    
        },
    
    
        function(err) {
            console.log('Token Error--->', err);
        }
    
    );
}

getSpotify();
