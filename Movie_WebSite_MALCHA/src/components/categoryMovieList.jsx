import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 추가
import styled, { keyframes } from 'styled-components';

// 깜빡이는 애니메이션 (Skeleton 효과)
const skeletonAnimation = keyframes`
  0% { opacity: 0.3; background-color: #e0e0e0; }
  50% { opacity: 0.7; background-color: #c0c0c0; }
  100% { opacity: 0.3; background-color: #e0e0e0; }
`;

const MovieCardContainer = styled.div`
  margin: 20px 0px 0px 30px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  justify-content: space-between;
  align-items: center;
`;

// Skeleton Loader 스타일
const SkeletonImage = styled.div`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  background-color: #e0e0e0;
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

// 실제 영화 포스터
const MovieImage = styled.img`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  &:hover {
    filter: brightness(0.4);
  }
`;

const MovieTitle = styled.p`
  font-family: monospace;
  font-size: 8px;
  font-weight: bolder;
  letter-spacing: -0.8px;
  margin: 0;
`;

const ReleaseDate = styled.p`
  font-family: monospace;
  font-size: 8px;
  margin: 0;
`;

const CardView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  margin-bottom: 27px;
  cursor: pointer;
`;

const NoResultsMessage = styled.div`
  font-size: 18px;
  color: white;
  text-align: center;
  margin-top: 20px;
`;

const CategoryMovieList = ({ movies, sourceURL, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage }) => {
  const navigate = useNavigate(); // useNavigate 훅 추가
  const containerRef = useRef(null); // 스크롤 이벤트를 감지할 컨테이너의 ref를 생성

  // 영화 클릭 시 상세 페이지로 이동하는 함수
  const handleMovieClick = (movieId) => {
    navigate(`/movieDescription/${movieId}`); // 상세 페이지로 이동, 경로 수정 필요
  };

  // 스크롤 이벤트 핸들러: 사용자가 스크롤을 끝까지 내리면 더 많은 데이터를 불러옵니다.
  const onScroll = () => {
    const container = containerRef.current;
    const bottom = container.getBoundingClientRect().bottom <= window.innerHeight;
    // 스크롤이 바닥에 도달했고, 로딩 중이 아니며, 다음 페이지가 존재하는 경우
    if (bottom && !isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  // useEffect를 사용하여 스크롤 이벤트 리스너 추가 및 정리
  useEffect(() => {
    const currentContainer = containerRef.current;
    currentContainer.addEventListener('scroll', onScroll);

    return () => {
      currentContainer.removeEventListener('scroll', onScroll);
    };
  }, [isFetchingNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <MovieCardContainer>
        {/* 로딩 중일 때 Skeleton Loader 표시 */}
        {Array(8)
          .fill()
          .map((_, index) => (
            <CardView key={index}>
              <SkeletonImage />
              <MovieTitle>로딩 중...</MovieTitle>
              <ReleaseDate>로딩 중...</ReleaseDate>
            </CardView>
          ))}
      </MovieCardContainer>
    );
  }

  if (!movies || movies.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

  return (
    <div 
      ref={containerRef} 
      style={{
        overflowY: 'auto',      // 스크롤 기능 유지
        height: '100vh',        // 화면 전체 크기로 지정
        scrollbarWidth: 'none', // Firefox에서 스크롤바 숨기기
        msOverflowStyle: 'none',// IE에서 스크롤바 숨기기
      }}
    >
      {/* 스크롤바를 숨기기 위한 스타일 */}
      <style>
        {`
          /* Chrome, Safari, Opera */
          div::-webkit-scrollbar {
            display: none;
          }
          /* Firefox */
          div {
            scrollbar-width: none;
          }
        `}
      </style>

      <MovieCardContainer>
        {movies.map((movie) => (
          <CardView key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MovieImage src={sourceURL(movie.poster_path)} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </CardView>
        ))}
      </MovieCardContainer>

      {/* 로딩 상태 표시 */}
      {isFetchingNextPage && <div>로딩 중...</div>}
    </div>
  );
};

export default CategoryMovieList;
