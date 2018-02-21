const clientID = '5f950d1b9ee34fada6537e15da6bab0b';
const redirectURI = "http://localhost:3000/";
let userAccessToken = '';
let expiresIn;
let playlistID;

let Spotify = {
  getAccessToken(accessToken) {
		if (userAccessToken != '') {
			return userAccessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
			token = window.location.href.match(/access_token=([^&]*)/)[1];
			expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = "https://accounts.spotify.com/authorize?client_id="+clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectURI;
		}
	},

	search: async function(searchTerm){
		let response = await fetch('https://api.spotify.com/v1/search?type=track&q='+searchTerm, { headers: {Authorization: `Bearer ${token}`}});
		try {
			if (response.ok) {
					let jsonResponse = await response.json();

					return jsonResponse;
			}
			throw new Error('Request failed!');
		} catch (error) {
			console.log(error);
		}
	},
}


export default Spotify;