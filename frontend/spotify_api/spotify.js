import {useEffect, useState} from "react";
import axios from 'axios';
import './spotify.css';

function Spotify_api() {
    const CLIENT_ID = "912672f0ea434527b6b8798fb8cfd331"
    const REDIRECT_URI = "http://localhost:1234"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    const [token, setToken] = useState("")
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])

    useEffect(() => {
        const hash = window.location.hash
        let token = window.localStorage.getItem("token")

        // getToken()

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

    const searchArtists = async (e) => {
        e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })

        setArtists(data.artists.items)
    }

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
                {artist.name}
            </div>
        ))
    }


    return (
        <div>
            <h1>Spotify Music</h1>
            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout}>Logout</button>}
            {renderArtists()}
            {token ?
                <div class="input-container">
                    <form onSubmit={searchArtists}>
                        <input type="text" className="input-field" placeholder="Enter your text" onChange={e => setSearchKey(e.target.value)}/>
                        <button type={"submit"} className="submit-button">Search</button>
                    </form>
                </div>

                    : <h2>Please login</h2>
            }
        </div>

    );
}

export default Spotify_api;