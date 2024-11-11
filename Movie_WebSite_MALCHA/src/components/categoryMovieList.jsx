import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';

// Skeleton 애니메이션: 배경색과 opacity가 깜빡임
const skeletonAnimation = keyframes`
  0% {
    opacity: 0.3;
    background-color: #e0e0e0; /* 회색 */
  }
  50% {
    opacity: 0.7;
    background-color: #c0c0c0; /* 더 밝은 회색 */
  }
  100% {
    opacity: 0.3;
    background-color: #e0e0e0; /* 회색 */
  }
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
  background-color: #e0e0e0; /* 기본 회색 */
  animation: ${skeletonAnimation} 1.5s infinite ease-in-out; /* 애니메이션 적용 */
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

const useFetchMovies = (fetchURL) => {
  const [movies, setMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(fetchURL);
        setMovies(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchURL]);

  return { movies, loading, error };
};

const CategoryMovieList = ({ fetchURL }) => {
  const { movies, loading, error } = useFetchMovies(fetchURL);
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    navigate(`/MovieDescription/${movieId}`); // 상세 페이지로 이동
  };

  const sourceURL = (path) => `https://image.tmdb.org/t/p/w500${path}`;

  // 로딩 상태에서 Skeleton UI 표시
  if (loading) {
    return (
      <MovieCardContainer>
        {/* Skeleton UI가 반복되어 보이도록 설정 */}
        {[...Array(8)].map((_, index) => (
          <CardView key={index}>
            <SkeletonImage />
          </CardView>
        ))}
      </MovieCardContainer>
    );
  }

  if (error) {
    return <div>오류 발생: {error.message}</div>;
  }

  // 영화가 없을 경우 메시지 출력
  if (movies.length === 0) {
    return <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>;
  }

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
