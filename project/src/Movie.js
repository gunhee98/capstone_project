import { useState } from "react";
import { useQuery } from "react-query";
import { getMovies } from "./api";
import { styled } from "styled-components";
import { makeImagePath } from "./utils";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useNavigate, useMatch } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
const Wrapper = styled.div`
  background: black;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled(ReactPlayer)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;
const Slider = styled.div`
  position: relative;
  top: -100px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 10px;
  position: absolute;
`;
const Box = styled(motion.div)`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  background-color: white;
  height: 200px;
  cursor: pointer;
  &:last-child {
    transform-origin: center right;
  }
  &:first-child {
    transform-origin: center left;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
  }
`;
const LeftBtn = styled(motion.button)`
  position: absolute;
  left: 0.5vw;
  top: 11vh;
  background-color: rgb(200, 200, 200);
  opacity: 0.5;
  border-radius: 50px;
  font-size: 25px;
  z-index: 1;
`;
const RightBtn = styled(motion.button)`
  position: absolute;
  left: 96vw;
  top: 11vh;
  background-color: rgb(200, 200, 200);
  opacity: 0.5;
  border-radius: 50px;
  font-size: 25px;
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
const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
};
const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;
const Movie = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [video, setVideo] = useState(null);
  fetch(
    `https://api.themoviedb.org/3/movie/${data?.results[0].id}/videos?api_key=c01a03bb13a5b4c7a5c790a7c7326099`
  )
    .then((response) => response.json())
    .then((response) => setVideo(response));
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.ceil(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId) => {
    navigate(`movies/${movieId}`);
  };
  const onOverlayClick = () => navigate(-1);
  const clickedMovie =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            url={`https://www.youtube.com/watch?v=${video?.results[0].key}`}
            width="100vw"
            height="100vh"
            loop={true}
            playing={true}
            muted={true}
            controls={false}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <LeftBtn
              whileHover={{
                scale: 1.2,
                opacity: 1,
                transition: { type: "tween", duration: 0.5 },
              }}
            >
              <div>◀︎</div>
            </LeftBtn>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(0)
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      onClick={() => onBoxClicked(movie.id)}
                      layoutId={movie.id + ""}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <RightBtn
              onClick={increaseIndex}
              whileHover={{
                scale: 1.2,
                opacity: 1,
                transition: { type: "tween", duration: 0.5 },
              }}
            >
              ▶️
            </RightBtn>
          </Slider>
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
