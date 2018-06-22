const clientId = '';
//const redirectUri = 'http://localhost:3000/'
const redirectUri = 'http://playlisfy.surge.sh/'
const queryUrl = "https://api.spotify.com/v1/search?type=track&q=";

let accessToken;
const Spotify = {
    getAccessToken() {
        if (!accessToken) {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

            if (accessTokenMatch && expiresInMatch) {
                const url = window.location.href;
                accessToken = url.match(/access_token=([^&]*)/)[1];
                const expiresIn = url.match(/expires_in=([^&]*)/)[1];

                window.setTimeout(() => {
                    accessToken = '';
                }, expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
            } else {
                window.location.href = "https://accounts.spotify.com/authorize?client_id=" + clientId + "&response_type=token&scope=playlist-modify-public&redirect_uri=" + redirectUri;
            }
        }
        return new Promise((resolve) => {
            return resolve(accessToken);
        });

    },

    // --------------------------

    search(term) {
        return Spotify.getAccessToken()
            .then(() => {
                return fetch(queryUrl + term, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed!');
                }
            }, networkError => console.log(networkError.message))
            .then(jsonResponse => {
                if (jsonResponse.tracks.items) {
                    return jsonResponse.tracks.items.map(track => {
                        return {
                            id: track.id,
                            name: track.name,
                            artist: track.artists[0].name,
                            album: track.album.name,
                            uri: track.uri,
                            cover: track.album.images[1].url,
                            play: track.preview_url
                        }
                    })
                }
            })
    },

    // --------------------------

    savePlaylist(playlistName, trackURIs) {
        let currentAccessToken = accessToken;
        let headers = {
            'Authorization': `Bearer ${currentAccessToken}`,
            'Content-Type': 'application/json'
        };
        let userId;
        let playlistId;

        // fetching user Id from API endpoint
        return fetch("https://api.spotify.com/v1/me", {
                headers: headers
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Request failed!');
                }
            }, networkError => console.log(networkError.message))
            .then(
                jsonResponse => {
                    if (jsonResponse.id) {
                        return userId = jsonResponse.id;
                    }
                }
            )
            // use returned userID for creating playlist and fetching its ID
            .then(() => {
                return fetch("https://api.spotify.com/v1/users/" + userId + "/playlists", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ 'name': playlistName })
                })
            }).then(response2 => {
                if (response2.ok) {
                    return response2.json();
                } else {
                    throw new Error('Request failed!');
                }
            }, networkError => console.log(networkError.message))
            .then(
                jsonResponse2 => {
                    if (jsonResponse2.id) {
                        return playlistId = jsonResponse2.id;
                    }
                }
            )
            // use userID and playlistID for adding tracks
            .then(() => {
                return fetch("https://api.spotify.com/v1/users/" + userId + "/playlists/" + playlistId + "/tracks", {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({ 'uris': trackURIs })
                })
            })
            .then(response3 => {
                if (response3.ok) {
                    return response3.json();
                } else {
                    throw new Error('Request failed!');
                }
            }, networkError => console.log(networkError.message))
            .then(
                jsonResponse3 => {
                    if (jsonResponse3.snapshot_id) {
                        console.log("Playlist: '" + playlistName + "' succesfuly saved!");
                    }
                }
            )
    } // end of savePlaylist method

}
export default Spotify;