const TEMP = ['c76d','1e84','c71c','02e6','9be2','fe4c','5874','7bb6'];
const BASE_URL = 'https://api.themoviedb.org/3';

export interface IMovie {
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
  page: number,
  results: IMovie[],
  total_pages: number,
  total_results: number
}

let movieQuantity = 0;

export const getMovies = async () => {
  const MovieData = await fetch(`${BASE_URL}/movie/now_playing?api_key=${TEMP.join('')}&language=en-US&page=1`).then((response) => response.json());
  movieQuantity = MovieData.results.length;
  return MovieData;
}

export const getLatestMovies = async () => {
  const { id: latestMovieId } = await fetch(`${BASE_URL}/movie/latest?api_key=${TEMP.join('')}&language=en-US&page=2`).then((response) => response.json());
  const latestMovies: any = [];
  for (let index = 0; index < movieQuantity; index++) {
    const latestMovie = await fetch(`${BASE_URL}/movie/${latestMovieId - index}?api_key=${TEMP.join('')}&language=en-US&page=2`).then((response) => response.json());
    latestMovies.push(latestMovie);
  }
  return latestMovies;
}

export const getMovieImg = (URI: string, format?: string) => {
  return `https://image.tmdb.org/t/p/${format ? format: 'original'}/${URI}`;
}