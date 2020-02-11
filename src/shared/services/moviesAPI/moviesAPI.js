import axios from 'axios';

const baseAxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
});

const baseParams = {
  api_key: 'bdd9effe0976100139ff894dd33a6667',
  sort_by: 'popularity.desc',
  language: 'en-US'
};

export const getMoviesConfig = () => {
  return baseAxiosInstance.get('/configuration', {
    params: {
      api_key: baseParams.api_key
    }
  });
};

export const getMovieList = () => {
  return baseAxiosInstance.get('/discover/movie', {
    params: baseParams
  });
};

export const searchMovie = movie => {
  return baseAxiosInstance.get('/search/movie', {
    params: {
      ...baseParams,
      query: movie
    }
  });
};
