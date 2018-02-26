const clientID = '5f950d1b9ee34fada6537e15da6bab0b';
const redirectURI = "http://localhost:3000/";
let userAccessToken = '';
let expiresIn;
let playlistID;

let Spotify = {
  getAccessToken(accessToken) {
		if (userAccessToken) {
			return userAccessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
			userAccessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = "https://accounts.spotify.com/authorize?client_id="+clientID+"&response_type=token&scope=playlist-modify-public&redirect_uri="+redirectURI;
		}
	},

	search(searchTerm){
		const access_token = this.getAccessToken();
		
    	return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
		headers: { Authorization: `Bearer ${access_token}` }
		}).then( response => { return response.json() } ).then(
			jsonResponse => {
			return jsonResponse.tracks.items.map(track => ({
				id: track.id,
				name: track.name,
				artist: track.artists[0].name,
				album: track.album.name,
				uri: track.uri
			}))
			}
		)
	},

	savePlaylist(playlistName, trackURIs) {
		if (!(playlistName && trackURIs)) {
			return;
		}

		let currentAccessToken = Spotify.userAccessToken;
		let headers = { 
			'Authorization': 'Bearer' + userAccessToken
		};
		let userID = '';

		return fetch('https://api.spotify.com/v1/me', { headers: headers }).then(response =>
			response.json()
		).then(jsonResponse => {
			userID = jsonResponse.id;

			return fetch(`/v1/users/${userID}/playlists`, {
				'headers': headers,
				'method': 'POST',
				'body': JSON.stringify({ 'name': playlistName })
			}).then(response => {
				if (response.ok){
					return response.json();
				}
				throw new Error('Request Failed');
			},
			networkError => { console.log(networkError.message) }
		).then(jsonResponse => {
			playlistID = jsonResponse.id;

				return fetch(`/v1/users/${userID}/playlists/${playlistID}/tracks?uris=${trackURIs}`, {
					'headers': headers,
					'method': 'POST'
				})
			});
		});
	}
}


export default Spotify;