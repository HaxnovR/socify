const SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require("body-parser");
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000",
    // origin: "https://testsocify.herokuapp.com",
    methods: ["GET", "POST"]
  }
});

var access_token = '';
var refresh_token = '';

dotenv.config();

// const port = process.env.PORT; //production
const port = 5000; //testing

console.log('Found on PORT =',port);

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

// const spotify_redirect_uri = 'https://testsocify.herokuapp.com/'
const spotify_redirect_uri = 'http://localhost:3000/'

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Run Static builded website
// Update Build in root folder
// app.use(express.static(path.join(__dirname, '../build')));
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

const randomState = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const scopes = ['user-read-private',
  'user-read-email',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'streaming',
  'user-read-recently-played'],
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

app.post('/auth/cred', (req,res) => {
  //  setup 
  
  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
      const code = req.body.code
  
      // Retrieve an access token
      spotifyApi.authorizationCodeGrant(code).then((data) => {
          res.json({
              accessToken : data.body.access_token,
              refreshToken : data.body.refresh_token
          }) 
      })
      .catch((err) => {
          console.log(err);
          res.sendStatus(400)
      })
  
  })


const links = ['1HZlFq0Ebjrvy12Cuw5hQG','5IEX6CpD9ZhUeacEMjMpGP','2znryEij05Rt0UDk9XD7Im','0HlhVnYUmzL7p7kdW2mn4i','3eY5obY2DtnSPiipASQt8G','6vem1g9dGwTG7XogsjIaew'];

let playlists = []
    spotifyApi.clientCredentialsGrant().then(
      function(data){
        spotifyApi.setAccessToken(data.body['access_token']);
        links.forEach(link => {
          spotifyApi.getPlaylist(link).then(function(data) {
            let playlist = {
              "name": data.body.name,
              "image": data.body.images[0].url,
              "url": data.body.external_urls.spotify
            }
            playlists.push(playlist)
            
          })
        });
        app.get('/api/playlists', (req,res) => {
          res.json({
            plst : playlists
          }) 
        })
      }
    )

app.get('/lobby/room', (req,res) => {
  //  setup 
  
  //  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api     
      const code = req.body.code
  
});

const generate_room = function () {
  var text = '';
  var possible = 'abcdefghijklmnopqrstuvwxyz';

  for (var i = 0; i < 8; i++) {
    if(i==4 ? text+='-' : text += possible.charAt(Math.floor(Math.random() * possible.length)));
  }
  return text;
};

var clients =[];

io.on("connection", (socket) => {
  console.log("client connected:",socket.id);

  socket.once("hosting-req", (user) => {
    console.log("Hosting requested by socket ID:", user);
    let room_id = generate_room();
    console.log("generated room code:", room_id);
    socket.emit("room_id", room_id);
    socket.join(room_id);
    socket.rooms.forEach(room => {
      if(room !== room_id)socket.leave(room);
    });
  })

  socket.on("joining-req", (user, invitecode) => {
    console.log("Hosting requested by socket ID:", user);
    let room_id = invitecode;
    const arr = Array.from(io.sockets.adapter.rooms);
    // socket.emit("room_id", room_id);
    socket.join(room_id);
    socket.rooms.forEach(room => {
      if(room !== room_id)socket.leave(room);
    });
    console.log("available rooms:", arr);
  })

  socket.on('storeClientInfo', function (data) {
      var clientInfo = new Object();
      clientInfo.userId = data.customId;
      clientInfo.clientId = socket.id;
      clients.push(clientInfo);
  });

  socket.on('disconnect', function (data) {
      for( var i=0, len=clients.length; i<len; ++i ){
          var c = clients[i];
          if(c.clientId == socket.id){
              clients.splice(i,1);
              break;
          }
      }
  });
});

  

// app.get('/auth/callback', (req, res) => {

//     var code = req.query.code;
//     res.send(code);
    
//     spotifyApi.authorizationCodeGrant(code).then(
//     function(data) {
  
//       // Set the access token on the API object to use it in later calls
//       spotifyApi.setAccessToken(data.body['access_token']);
//       spotifyApi.setRefreshToken(data.body['refresh_token']);
//       access_token = data.body.access_token;
//       refresh_token = data.body.refresh_token;
//       res.redirect('/');
//     },
//     function(err) {
//       console.log('Something went wrong!', err);
//     }
//   );
// });

// app.get('/auth/token', (req, res) => {
//   res.json({ access_token: access_token,
//     refresh_token: refresh_token
//   });
// });

httpServer.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});
