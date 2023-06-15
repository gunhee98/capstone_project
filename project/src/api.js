const API_KEY = "c01a03bb13a5b4c7a5c790a7c7326099";
const BASE_PATH = "https://api.themoviedb.org/3";

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&page=1&include_adult=false&language=en-US`
  ).then((response) => response.json());
}
export function getTopMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=2&include_adult=false&language=en-US`
  ).then((response) => response.json());
}
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
