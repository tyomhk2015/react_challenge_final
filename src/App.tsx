import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import Tv from "./components/Tv";
import getMovies from "./api";
import { useQuery } from 'react-query';

function App() {
  const { data: movieData, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(movieData, isLoading);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
