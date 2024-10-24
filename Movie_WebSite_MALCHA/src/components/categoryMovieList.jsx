import React, { useEffect, useState } from 'react';
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
    margin-block-start: 0em;
    margin-block-end: 0em;
`;

const ReleaseDate = styled.p`
    font-family: monospace;
    font-size: 8px; 
    margin-block-start: 0em;
    margin-block-end: 0em;
`;

const CardView = styled.div`
    display: flex; // 수정된 부분
    flex-direction: column;
    justify-content: center;
    color: white;
    margin-bottom: 27px;
`;

const CategoryMovieList = ({ fetchURL, sourceURL }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, [fetchURL]); // fetchUrl 추가

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;

    return (
        <MovieCardContainer>
            {movies.map(movie => (
                <CardView key={movie.id}>
                    <MovieImage src={sourceURL(movie.poster_path)} alt={movie.title} />
                    <MovieTitle>{movie.title}</MovieTitle>
                    <ReleaseDate>{movie.release_date}</ReleaseDate>
                </CardView>
            ))}
        </MovieCardContainer>
    );
};

export default CategoryMovieList;
