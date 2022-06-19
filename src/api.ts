const TEMP = ['c76d','1e84','c71c','02e6','9be2','fe4c','5874','7bb6'];
const BASE_URL = 'https://api.themoviedb.org/3';

interface IMovie {
  backdrop_path: string,
  id: number,
  overview: string,
  poster_path: string,
  title: string
}
export interface IMovieResult {
  dates: {
    maximum: string
    minimum: string
  },
  page: 1,
  results: IMovie[],
  total_pages: number,
  total_results: number
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/movie/now_playing?api_key=${TEMP.join('')}&language=en-US&page=1`).then((response) => response.json());
}

export const getMovieImg = (URI: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format: 'original'}/${URI}`;
}