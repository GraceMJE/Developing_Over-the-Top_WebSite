import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 추가
import styled, { keyframes } from 'styled-components';

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

const SkeletonImage = styled.div`
  width: 100px;
  height: 150px;
  border-radius: 10px;
  background-color: #e0e0e0;
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out;
`;

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

const CategoryMovieList = ({ movies, sourceURL }) => {
  const navigate = useNavigate(); // useNavigate 훅 추가

  // 로딩 상태와 에러 처리가 NowPlaying에서 처리되므로 여기서는 그저 데이터만 전달받아 사용
  if (!movies || movies.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

  // 영화 클릭 시 상세 페이지로 이동하는 함수
  const handleMovieClick = (movieId) => {
    navigate(`/movieDescription/${movieId}`); // 상세 페이지로 이동, 경로 수정 필요
  };

  return (
    <MovieCardContainer>
      {movies.map((movie) => (
        <CardView key={movie.id} onClick={() => handleMovieClick(movie.id)}>
          <MovieImage src={sourceURL(movie.poster_path)} alt={movie.title} />
          <MovieTitle>{movie.title}</MovieTitle>
          <ReleaseDate>{movie.release_date}</ReleaseDate>
        </CardView>
      ))}
    </MovieCardContainer>
  );
};

export default CategoryMovieList;
