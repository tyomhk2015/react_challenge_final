import { getLatestMovies, getMovieImg, getMovies, IMovie, IMovieResult } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Wrapper = styled.div``;

const Loading = styled.p`
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${(props) => props.theme.default.loadingColor};
`;

const Banner = styled.section<{ bgImg: string }>`
  height: 60vh;
  background-color: rgba(0, 0, 0, 1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgImg});
  background-size: cover;
  background-position: top;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.default.textColor};
  font-size: 3rem;
  width: 50%;
`;

const Overview = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  width: 50%;
  color: ${(props) => props.theme.default.textColor};
`;

const Slider = styled.div`
  position: relative;
  margin-top: 1.5rem;
  height: 160px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const MoviePanel = styled(motion.div)<{ bgimg: string }>`
  background-color: rgba(255, 255, 255, 1);
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center;
  height: 160px;
`;

const MovieCategory = styled.h3`
  padding: 0 60px;
  color: ${(props) => props.theme.default.textColor};
  font-size: 2rem;
  margin-top: 2rem;
  text-decoration: underline;
`;
const SliderWrapper = styled.div`
  padding-bottom: 3rem;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 6,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 6,
  },
};

const offset = 6;

const Home = () => {
  const { data: nowPlayingMovieData, isLoading } = useQuery<IMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const { data: latestMovieData } = useQuery<IMovie[]>(
    ["movies", "latest"],
    getLatestMovies
  );

  console.log(latestMovieData);

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const showNextSlide = () => {
    if (nowPlayingMovieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = nowPlayingMovieData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper onClick={showNextSlide}>
      {isLoading ? (
        <Loading>Loading</Loading>
      ) : (
        <>
          <Banner
            bgImg={getMovieImg(
              nowPlayingMovieData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{nowPlayingMovieData?.results[0].title}</Title>
            <Overview>{nowPlayingMovieData?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <MovieCategory>Now Playing</MovieCategory>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {nowPlayingMovieData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <MoviePanel
                        key={movie.id}
                        bgimg={getMovieImg(movie.backdrop_path, "w300")}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <MovieCategory>Latest</MovieCategory>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {latestMovieData?.slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <MoviePanel
                        key={movie.id}
                        bgimg={getMovieImg(movie.backdrop_path).includes('null') ? "https://raw.githubusercontent.com/tyomhk2015/react_challenge_final/main/src/image/noimage.png" : getMovieImg(movie.backdrop_path, "w300")}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <MovieCategory>Top Rated</MovieCategory>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {nowPlayingMovieData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <MoviePanel
                        key={movie.id}
                        bgimg={getMovieImg(movie.backdrop_path, "w300")}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
            <MovieCategory>Upcoming</MovieCategory>
            <Slider>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "tween", duration: 1 }}
                  key={index}
                >
                  {nowPlayingMovieData?.results
                    .slice(1)
                    .slice(offset * index, offset * index + offset)
                    .map((movie) => (
                      <MoviePanel
                        key={movie.id}
                        bgimg={getMovieImg(movie.backdrop_path, "w300")}
                      />
                    ))}
                </Row>
              </AnimatePresence>
            </Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
