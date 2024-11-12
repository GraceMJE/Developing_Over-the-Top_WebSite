import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  width: 50px;
  height: 30px;
  margin: 0 5px;
  font-size: 13px;
  text-align: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  background-color: ${(props) => (props.disabled ? '#ccc' : '#FF007F')};
  color: white;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.disabled ? '#ccc' : 'pink')};
  }
`;

const PaginationHomeButton = styled.button`
  width: 50px;
  height: 30px;
  margin: 0 5px;
  font-size: 13px;
  text-align: center;
  background-color: transparent;
  color: white;
  border: none;

  &:hover {
    color: grey;
  }
`;

const PageNumber = styled.div`
  font-family: monospace;
  font-size: 12px;
  color: white;
  margin: 0 10px;
`;

const CategoryMovieList = ({
  movies,
  sourceURL,
  isLoading,
  currentPage,
  onPageChange,
  hasNextPage,
}) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/movieDescription/${movieId}`);
  };

  // 페이지가 변경될 때 스크롤을 위로 올리는 함수
  useEffect(() => {
    window.scrollTo(0, 0);  // 페이지 전환 시 스크롤을 맨 위로
  }, [currentPage]);

  if (isLoading) {
    return (
      <MovieCardContainer>
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
    <div style={{ paddingBottom: '50px' }}>
      <MovieCardContainer>
        {movies.map((movie) => (
          <CardView key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MovieImage src={sourceURL(movie.poster_path)} alt={movie.title} />
            <MovieTitle>{movie.title}</MovieTitle>
            <ReleaseDate>{movie.release_date}</ReleaseDate>
          </CardView>
        ))}
      </MovieCardContainer>

      <PaginationContainer>
        <PaginationHomeButton
          onClick={() => onPageChange(1)}
        >
          🏠🫧
        </PaginationHomeButton>

        <PaginationButton
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          이전
        </PaginationButton>
        
        <PageNumber>{currentPage} 페이지</PageNumber>

        <PaginationButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
        >
          다음
        </PaginationButton>
      </PaginationContainer>
    </div>
  );
};

export default CategoryMovieList;
