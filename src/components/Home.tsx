import { getMovieImg, getMovies, IMovieResult } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 1);
`;

const Loading = styled.p`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${(props) => props.theme.default.loadingColor};
`;

const Banner = styled.section<{bgImg: string}>`
  height: 100vh;
  background-color: rgba(0,0,0,1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)), url(${props=> props.bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  color: ${props => props.theme.default.textColor};
  font-size: 3rem;
  width: 50%;
`

const Overview = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  width: 50%;
  color: ${props => props.theme.default.textColor};
`

const Home = () => {
  const { data: movieData, isLoading } = useQuery<IMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return <Wrapper>
    {isLoading ? 
      <Loading>Loading</Loading> 
      :
      <>
        <Banner bgImg={getMovieImg(movieData?.results[0].backdrop_path || "")}>
          <Title>{movieData?.results[0].title}</Title>
          <Overview>{movieData?.results[0].overview}</Overview>
        </Banner>
      </>
    }
    </Wrapper>;
};

export default Home;
