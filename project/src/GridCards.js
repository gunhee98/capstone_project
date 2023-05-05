import React, { useEffect, useState } from "react";
import "./Grid.css";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "./Config";

function Grid() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies(response.results);
      });
  }, []);

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=2`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
      });
  }, []);

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=3`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
      });
  }, []);

  useEffect(() => {
    const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=4`;
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovies((prevMovies) => [...prevMovies, ...response.results]);
      });
  }, []);

  return (
    <div className="Card-container">
      <div className="grid-container card-animation1">
        {movies.slice(0, 20).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
        {movies.slice(0, 20).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
      </div>
      <div className="grid-container card-animation-reverse">
        {movies.slice(20, 40).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
        {movies.slice(20, 40).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
      </div>
      <div className="grid-container card-animation1">
        {movies.slice(40, 60).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
        {movies.slice(40, 60).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
      </div>
      <div className="grid-container card-animation-reverse">
        {movies.slice(60, 80).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
        {movies.slice(60, 80).map((movie) => (
          <img src={`${IMAGE_BASE_URL}w500${movie.poster_path}`} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
