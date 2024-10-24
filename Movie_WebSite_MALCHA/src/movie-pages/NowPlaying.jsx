import React from 'react';
import CategoryMovieList from '../components/categoryMovieList';
import { myAPIkey } from '../myAPI';

const NowPlaying = () => {
    return (
        <CategoryMovieList
        fetchURL={`https://api.themoviedb.org/3/movie/now_playing?api_key=${myAPIkey}&language=ko-KR&page=1`} // 템플릿 리터럴 수정
        sourceURL={(path) => `https://image.tmdb.org/t/p/w500${path}`}
        />
    );
};

export default NowPlaying;
