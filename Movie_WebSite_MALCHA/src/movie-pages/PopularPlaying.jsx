import React from 'react';
import CategoryMovieList from '../components/categoryMovieList';
import { myAPIkey } from '../myAPI';

const PopularPlaying = () => {
    return (
        <CategoryMovieList
        fetchURL={`https://api.themoviedb.org/3/movie/popular?api_key=${myAPIkey}&language=ko-KR&page=1`}
        sourceURL={(path) => `https://image.tmdb.org/t/p/w500${path}`}
        />
    );
};

export default PopularPlaying;
