import { getMovieImg, getMovies, IMovieResult } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion } from "framer-motion";
import NowPlayingSlider from "./NowPlayingSlider";
import LatestSlider from "./LatestSlider";
import TopRatedSlider from "./TopRatedSlider";
import UpcomingSlider from "./UpcomingSlider";

const Wrapper = styled(motion.div)``;

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

const SliderWrapper = styled.div`
  padding-bottom: 3rem;
`;

const Home = () => {
  const { data: nowPlayingMovieData, isLoading } = useQuery<IMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Wrapper>
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
            <NowPlayingSlider />
            <TopRatedSlider />
            <UpcomingSlider />
            <LatestSlider />
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
