const SpotifyWebApi = require("spotify-web-api-node");

const links = ['1HZlFq0Ebjrvy12Cuw5hQG','5IEX6CpD9ZhUeacEMjMpGP','2znryEij05Rt0UDk9XD7Im'];
let info = []
let image = []

var spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken('BQBkXwycLXMbzD4YPisn1dyUzH3dP_ss0qnVhJcmZ5Ee8Vi1n3fGUjGM2eAq4JwcEP9kz1eC7fAk5hp5iYg8Lj0x6Ge0FLI7KJ7FXh0iDxCR-LxXTgxIRowHZxnIL8pSo3xRNmo1vvp7dPMJf-R9hnR34JyQbWc04v0H-2J-jnTEoaAVC-LylZFntU361-P3qsGLIuAg9Q4MsH_gI6PEIwwYvwNuJAk-KSU');
        

links.forEach(link => {
  spotifyApi.getPlaylist(link).then(function(data) {
    info.push(data.body.name);
    image.push(data.body.images[0].url);
    console.log(info,"|",image)
  })
});
