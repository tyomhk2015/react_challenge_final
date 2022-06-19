const TEMP = ['c76d','1e84','c71c','02e6','9be2','fe4c','5874','7bb6'];
const BASE_URL = 'https://api.themoviedb.org/3';

const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${TEMP.join('')}&language=en-US&page=1`).then((response) => response.json());
}

export default getMovies;