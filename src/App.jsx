import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import MG from './search.svg';

const api = 'http://www.omdbapi.com?apikey=e0b9af1b';

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies('Avengers');
  }, []);
  
  const searchMovies = async (title) => {
    const response = await fetch(`${api}&s=${title}`);

    const data = await response.json();

    setMovies(data.Search);
  }

  return (
    <div className="app">
      <h1>Movie Hunger</h1>

      <div className="search">
        <input type="text"
          value = {searchTerm}
          onChange = {(e) => setSearchTerm(e.target.value)}
          placeholder="Feed Your Hunger..."
        />
        <img src={MG} alt="search icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (

        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie = { movie } />
          ))}
        </div>

      ) : (

        <div className="empty">
          <h2>Opps! no movies available! Search for another, Hungry..!</h2>
        </div>

      )}

    </div>
  );
}

export default App;
