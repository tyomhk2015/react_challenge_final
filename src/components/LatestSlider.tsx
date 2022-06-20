import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getLatestMovies, getMovieImg, IMovie } from "../api";

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
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const MovieTitle = styled.h3`
  padding: 0 60px;
  color: ${(props) => props.theme.default.textColor};
  font-size: 2rem;
  margin-top: 2rem;
  text-decoration: underline;
  & > small {
    font-size: 12px;
    margin-left: 20px;
    font-weight: normal;
    text-decoration: none;
  }
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

const LatestSlider = () => {
  const { data: latestMovieData } = useQuery<IMovie[]>(
    ["movies", "latest"],
    getLatestMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const showNextSlide = () => {
    if (latestMovieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = latestMovieData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <>
      <MovieTitle>Latest<small>*Sucessfully got latest movies, but API rarely provide path for images.</small></MovieTitle>
      <Slider onClick={showNextSlide}>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {latestMovieData &&
              latestMovieData
                ?.slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <MoviePanel
                    key={movie.id}
                    bgimg={
                      getMovieImg(movie.backdrop_path).includes("null")
                        ? "https://raw.githubusercontent.com/tyomhk2015/react_challenge_final/main/src/image/noimage.png"
                        : getMovieImg(movie.backdrop_path, "w300")
                    }
                  >
                    {movie.title}
                  </MoviePanel>
                ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </>
  );
};

export default LatestSlider;
