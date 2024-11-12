import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { myAPIkey } from '../myAPI';
import { ClipLoader } from 'react-spinners'; // ClipLoader 임포트
import CategoryMovieList from '../components/categoryMovieList';

// 영화 데이터를 가져오는 함수
const fetchUpcomingPlayingMovies = async ({ queryKey }) => {
  const [_key, { page, language }] = queryKey;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${myAPIkey}&language=${language}&page=${page}`
  );
  return response.data;
};

const UpcomingPlaying = () => {
  // 페이지 상태 관리
  const [currentPage, setCurrentPage] = useState(1);

  // React Query의 useQuery 훅을 사용하여 데이터를 가져오기
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    isFetching 
  } = useQuery({
    queryKey: ['UpcomingPlayingMovies', { page: currentPage, language: 'ko-KR' }], // queryKey에 페이지와 언어를 명확히 포함
    queryFn: fetchUpcomingPlayingMovies,
    keepPreviousData: true,  // 이전 데이터를 유지하면서 새로운 데이터를 불러오도록 설정
  });

  const sourceURL = (path) => `https://image.tmdb.org/t/p/w500${path}`;

  // 페이지 변경 함수
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > (data?.total_pages || 1)) return;  // 페이지 범위를 초과하지 않도록 처리
    setCurrentPage(newPage);
  };

  // 로딩 상태일 때 스피너 표시 (초기 데이터 로딩)
  if (isLoading || isFetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#ffffff" loading={isLoading || isFetching} size={50} />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError) {
    return <div>오류 발생: {error.message}</div>;
  }

  // 영화가 없을 경우 처리
  if (!data || data.results.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  // 영화 데이터 가져오기
  const movies = data.results;
  const hasNextPage = currentPage < data.total_pages;

  return (
    <div>
      <CategoryMovieList
        movies={movies}
        sourceURL={sourceURL}
        isLoading={isFetching}
        currentPage={currentPage} // 현재 페이지를 전달
        onPageChange={handlePageChange} // 페이지 변경 함수 전달
        hasNextPage={hasNextPage} // 다음 페이지가 있는지 여부 전달
      />

      {/* 추가 페이지 로딩 중 스피너 표시 */}
      {isFetching && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
          <ClipLoader color="#ffffff" loading={isFetching} size={30} />
        </div>
      )}
    </div>
  );
};

export default UpcomingPlaying;
