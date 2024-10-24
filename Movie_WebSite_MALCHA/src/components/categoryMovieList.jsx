import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const MovieCardContainer = styled.div`
    margin: 20px 0px 0px 30px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    justify-content: space-between;
    align-items: center;
`;

const MovieImage = styled.img`
    width: 100px;
    border-radius: 10px;
    &:hover { filter: brightness(0.4); }
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
    cursor: pointer; // 커서 스타일 추가
`;

// Custom Hook
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

// CategoryMovieList Component
const CategoryMovieList = ({ fetchURL, sourceURL }) => {
    const { movies, loading, error } = useFetchMovies(fetchURL);
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleMovieClick = (movieId) => {
        navigate(`/MovieDescription/${movieId}`); // 상세 페이지로 이동
    };    

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;

    return (
        <MovieCardContainer>
            {movies.map(movie => (
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
