import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

function Home() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const searchMovies = async () => {
        if (!query.trim()) return;
        const apiKey = process.env.REACT_APP_TMDB_API_KEY;
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

        try {
            const response = await axios.get(url);
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const showDetails = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="container">
            <h1>Movie Recommendations</h1>
            <div className="search-box">
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a movie..." 
                />
                <button onClick={searchMovies}>Search</button>
            </div>

            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card" onClick={() => showDetails(movie)}>
                        <img 
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                            alt={movie.title} 
                        />
                        <h3>{movie.title}</h3>
                    </div>
                ))}
            </div>

            {selectedMovie && (
                <div className="movie-details">
                    <h2>{selectedMovie.title}</h2>
                    <p>{selectedMovie.overview}</p>
                    <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>
                    <p><strong>Rating:</strong> {selectedMovie.vote_average}</p>
                </div>
            )}
        </div>
    );
}

export default Home;