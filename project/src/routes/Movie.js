import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getMovies,
  getTopMovies,
  getPopularMovies,
  getUpcomingMovies,
} from "../api";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import Sliders from "../components/Sliders";
import Banner from "../components/Banner";
import { Helmet } from "react-helmet-async";
import TopNav from "../TopNav"
const Wrapper = styled.div`
  height: 205vh;
  background-color: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;
const SliderNow = styled.div`
  position: relative;
  top: -100px;
`;
const SliderTop = styled.div`
  position: relative;
  top: 100px;
`;
const SliderPop = styled.div`
  position: relative;
  top: 300px;
`;
const SliderUp = styled.div`
  position: relative;
  top: 500px;
`;
const SliderInfo = styled.span`
  font-size: 25px;
  margin-left: 10px;
  margin-bottom: 5px;
  font-weight: 500;
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 25px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const Movie = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bigMovieMatch = useMatch("/movie/movies/:movieId");
  const { data: nowMovie, isLoading: nowLoading } = useQuery(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: topMovie, isLoading: topLoading } = useQuery(
    ["topmovies", "top"],
    getTopMovies
  );
  const { data: popMovie, isLoading: popLoading } = useQuery(
    ["popmovies", "pop"],
    getPopularMovies
  );
  const { data: upMovie, isLoading: upLoading } = useQuery(
    ["upmovies", "up"],
    getUpcomingMovies
  );
  const onOverlayClick = () => navigate(-1);
  const clickedMovie =
    (bigMovieMatch?.params.movieId &&
      nowMovie?.results.find(
        (movie) => movie.id === +bigMovieMatch.params.movieId
      )) ||
    topMovie?.results.find(
      (movie) => movie.id + "" === bigMovieMatch?.params.movieId
    ) ||
    popMovie?.results.find(
      (movie) => movie.id + "" === bigMovieMatch?.params.movieId
    ) ||
    upMovie?.results.find(
      (movie) => movie.id + "" === bigMovieMatch?.params.movieId
    );
  return (
    <Wrapper>
      <TopNav></TopNav>
      <Helmet>
        <title>Movie</title>
      </Helmet>
      {nowLoading && topLoading && popLoading && upLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={nowMovie} />
          <SliderNow>
            <SliderInfo>Now playing</SliderInfo>
            <Sliders data={nowMovie} />
          </SliderNow>
          <SliderTop>
            <SliderInfo>Top Rated</SliderInfo>
            <Sliders data={topMovie} />
          </SliderTop>
          <SliderPop>
            <SliderInfo>Popular</SliderInfo>
            <Sliders data={popMovie} />
          </SliderPop>
          <SliderUp>
            <SliderInfo>Upcoming</SliderInfo>
            <Sliders data={upMovie} />
          </SliderUp>
          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  layoutId={bigMovieMatch.params.movieId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};
export default Movie;
