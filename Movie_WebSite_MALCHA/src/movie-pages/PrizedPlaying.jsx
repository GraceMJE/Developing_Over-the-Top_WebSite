import React from 'react';
import CategoryMovieList from '../components/categoryMovieList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { myAPIkey } from '../myAPI';

// 영화 데이터를 가져오는 함수
const fetchPirzedPlayingMovies = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${myAPIkey}&language=ko-KR&page=1`
  );
  return response.data.results; // 데이터를 반환
};

const PirzedPlaying = () => {
  // React Query의 useQuery 훅을 사용하여 데이터를 가져오기
  const { data: movies, isLoading, isError, error } = useQuery({
    queryKey: ['PirzedPlayingMovies'], // queryKey를 설정
    queryFn: fetchPirzedPlayingMovies,  // API 호출 함수
  });

  const sourceURL = (path) => `https://image.tmdb.org/t/p/w500${path}`;

  if (isLoading) {
    return <div>로딩 중...</div>; // 로딩 상태 처리
  }

  if (isError) {
    return <div>오류 발생: {error.message}</div>; // 에러 상태 처리
  }

  if (!movies || movies.length === 0) {
    return <div>검색 결과가 없습니다.</div>; // 영화가 없을 경우 처리
  }

  // CategoryMovieList 컴포넌트에 영화 데이터를 전달하여 렌더링
  return (
    <CategoryMovieList
      movies={movies}
      sourceURL={sourceURL} // 이미지 URL 변환 함수 전달
    />
  );
};

export default PirzedPlaying;
