import React from 'react';
import CategoryMovieList from '../components/categoryMovieList';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { myAPIkey } from '../myAPI';
import { ClipLoader } from 'react-spinners'; // ClipLoader 임포트

// 영화 데이터를 가져오는 함수
const fetchPrizedPlayingMovies = async ({ pageParam = 1 }) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${myAPIkey}&language=ko-KR&page=${pageParam}`
  );
  return response.data;
};

const prizedPlaying = () => {
  // React Query의 useInfiniteQuery 훅을 사용하여 데이터를 가져오기
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['PrizedPlayingMovies'],
    queryFn: fetchPrizedPlayingMovies,
    getNextPageParam: (lastPage) => {
      // 더 이상 데이터가 없으면 false 반환
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : false;
    },
  });

  const sourceURL = (path) => `https://image.tmdb.org/t/p/w500${path}`;

  // 로딩 상태일 때 스피너 표시 (초기 데이터 로딩)
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#ffffff" loading={isLoading} size={50} />
      </div>
    );
  }

  if (isError) {
    return <div>오류 발생: {error.message}</div>; // 에러 상태 처리
  }

  if (!data || data.pages.length === 0) {
    return <div>검색 결과가 없습니다.</div>; // 영화가 없을 경우 처리
  }

  // 모든 페이지의 데이터를 결합
  const movies = data.pages.flatMap(page => page.results);

  return (
    <div>
      <CategoryMovieList
        movies={movies}
        sourceURL={sourceURL}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
      
      {/* 추가 페이지 로딩 중 스피너 표시 */}
      {isFetchingNextPage && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <ClipLoader color="#ffffff" loading={isFetchingNextPage} size={30} />
        </div>
      )}
    </div>
  );
};

export default prizedPlaying;
