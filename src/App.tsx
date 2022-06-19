import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Search from "./components/Search";
import Tv from "./components/Tv";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/react_challenge_final/tv" element={<Tv />} />
        <Route path="/react_challenge_final/search" element={<Search />} />
        <Route path="/react_challenge_final/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
