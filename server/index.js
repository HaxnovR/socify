const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const port = 3000;

var access_token = '';
var refresh_token = '';

dotenv.config()

const app = express();

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
const spotify_redirect_uri = 'https://testsocify.herokuapp.com/auth/callback'
// const spotify_redirect_uri = 'http://localhost:3000/auth/callback'

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const randomState = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const scopes = ['user-read-private', 'user-read-email',
'user-modify-playback-state','user-read-playback-state','user-read-currently-playing'
,'streaming','user-read-recently-played'],
  redirectUri = spotify_redirect_uri,
  clientId = spotify_client_id,
  state = randomState(16),
  showDialog = true;

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId,
  clientSecret: spotify_client_secret
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, showDialog);

console.log(authorizeURL);

app.get('/auth/login', (req, res) => {
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, showDialog);
    res.redirect(authorizeURL.toString());
})

app.get('/auth/callback', (req, res) => {

    var code = req.query.code;
    
    spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
  
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      access_token = data.body.access_token;
      refresh_token = data.body.refresh_token;
      res.redirect('/');
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token,
    refresh_token: refresh_token
  });
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
