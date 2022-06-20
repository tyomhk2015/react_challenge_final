import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovieImg, getUpcomingMovies, IMovie } from "../api";

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

const UpcomingSlider = () => {
  const { data: upcomingMovieData } = useQuery<IMovie[]>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const showNextSlide = () => {
    if (upcomingMovieData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = upcomingMovieData.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <>
      <MovieCategory>Upcoming</MovieCategory>
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
            {upcomingMovieData &&
              upcomingMovieData
                ?.slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <MoviePanel
                    key={movie.id}
                    bgimg={
                      getMovieImg(movie.backdrop_path).includes("null")
                        ? "https://raw.githubusercontent.com/tyomhk2015/react_challenge_final/main/src/image/noimage.png"
                        : getMovieImg(movie.backdrop_path, "w300")
                    }
                  />
                ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </>
  );
};

export default UpcomingSlider;
