import { useEffect, useState } from "react";
import axios from "axios";
import './spotify.css';
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player"
import SpotifyPlayer from 'react-spotify-web-playback';

function Spotify_api() {
    const CLIENT_ID = "912672f0ea434527b6b8798fb8cfd331"
    const REDIRECT_URI = "http://localhost:1234"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"
    const SCOPE = "streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [tracks, setTracks] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [showSearchResults, setShowSearchResults] = useState(true)

    function chooseTrack(track) {
        setPlayingTrack(track)
        setShowSearchResults(false)
    }

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        if (!token && hash) {
            token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

            window.location.hash = ""
            window.localStorage.setItem("token", token)
        }

        setToken(token)
    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }

    const searchTracks = async (e) => {
        e.preventDefault();

        const endpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchKey)}&type=track`;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await axios.get(endpoint, { headers });

            //show first 10 results
            const trackItems = response.data.tracks.items.slice(0,10).map((track) => {
                const smallestImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) {
                            return image
                        }
                        else {
                            return smallest
                        }
                    }, track.album.images[0]
                )
                return {
                    name: track.name,
                    artist: track.artists[0].name,
                    uri: track.uri,
                    image: smallestImage.url,
                };
            });
            setTracks(trackItems);
            setShowSearchResults(true); // Show search results after fetching
        } catch (error) {
            console.error('Error searching tracks:', error);
        }
    };

    return (
        <div>
            <div className="container">
                <h1 className="mt-5">Spotify Music</h1>
                {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`} className="login-button btn btn-success mt-3">Login to Spotify</a>
                    : <button onClick={logout} className="logout-button btn btn-danger mt-3">Logout</button>}
            </div>

            {token ? (
                <div>
                    <div className="input-container">
                        <form onSubmit={searchTracks}>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Enter your text"
                                onChange={(e) => setSearchKey(e.target.value)}
                           
                              
                            />
                            <button type="submit" className="submit-button">
                                Search
                            </button>
                        </form>
                    </div>
                    {showSearchResults && tracks.length > 0 && (
                        <div>
                            <h2>Search Results</h2>
                            <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                                {tracks.map(track => (
                                    <TrackSearchResult
                                        track={track}
                                        key={track.uri} 
                                        chooseTrack={chooseTrack}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {playingTrack && (
                        <div> 
                            <Player accessToken={token} trackUri={playingTrack?.uri} />
                        </div>
                    )}
                </div>
            ) : <h2 className="login-text"></h2>}
        </div>
    );
}

export default Spotify_api;
