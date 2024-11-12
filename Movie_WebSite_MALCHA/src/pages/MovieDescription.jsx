import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query'; // useQuery import
import { myAPIkey } from '../myAPI';

// 전체 틀
const Container = styled.div`
    color: white;
    padding: 10px;
    display: flex;
    flex-direction: column;
`;

// 상단 - 영화주요 정보(포스터, 제목 등)
const Header = styled.div`
    width: 100%;
    height: 280px;
    position: relative;
    overflow: hidden;
`;

// 영화 포스터 사진
const BackgroundImage = styled.div`
    background-image: url(${props => props.src});
    background-size: cover;
    background-position: 0px -250px;
    border-radius: 15px;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 1;
`;

// 그라데이션 효과를 위한 디자인코드
const GradationEffect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    z-index: 2; /* 포스터 위에 표시 */
`;

// 영화정보 글자를 담는 전체 큰 박스
const DescriptionText = styled.div`
    position: absolute;
    left: 20px;
    z-index: 3;
    text-align: left;
`;

const MovieTitle = styled.h1`
    font-family: monospace;
    font-size: 1.5em;
    color: white;
    text-shadow: 1px 1px 2px black;
    margin-bottom: 9px;
`;

const MovieInformation = styled.h2`
    font-family: monospace;
    font-size: 1em;
    color: white;
    margin: 0;
`;

const MovieOverview = styled.p`
    font-family: monospace;
    font-size: 11px;
    color: white;
    text-shadow: 1px 1px 2px black;
    margin-right: 66.4%;
    margin-top: 15px;
`;

const Divider = styled.div`
    height: 0.5px;
    background-color: white;
    margin-left: 1.7%;
    margin-right: 66%;
`;

const EtcInformation = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 14px;
`;

const CastContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;
    max-height: 250px;
`;

const CastInformationContainer = styled.div`
    display: block;
    margin-bottom: 30px;
    text-align: center;
`;

const CastMemberImage = styled.img`
    border-radius: 50%;
    border: 2px solid white;
    width: 70px;
    height: 70px;
    object-fit: cover;
    margin: 0 auto;
`;

const CastName = styled.p`
    font-size: 8px;
    letter-spacing: -0.3px;
    margin: 0;
    margin-top: 7px;
`;

const CastRole = styled.p`
    font-size: 7px;
    color: gray;
    margin: 0;
    margin-top: 3px;
`;

const fetchMovieDetails = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${myAPIkey}&language=ko-KR&append_to_response=credits`);
    if (!response.data || !response.data.title) {
        throw new Error("유효한 영화 정보를 찾을 수 없습니다.");
    }
    return response.data;
};

// cast 정보를 별도로 가져오는 함수 (별도로 useQuery를 사용)
const fetchCastInfo = async (movieId) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${myAPIkey}`);
    return response.data;
};

const MovieDescription = () => {
    const { movieId } = useParams();

    // 영화 데이터와 크레딧 데이터를 가져오기 위한 useQuery
    const { data: movieData, error: movieError, isLoading: movieLoading, isError: movieIsError } = useQuery({
        queryKey: ['movieDetails', movieId],
        queryFn: () => fetchMovieDetails(movieId),
    });

    // cast 정보를 가져오기 위한 useQuery
    const { data: castData, error: castError, isLoading: castLoading, isError: castIsError } = useQuery({
        queryKey: ['castDetails', movieId],
        queryFn: () => fetchCastInfo(movieId),
    });

    // 로딩, 오류 처리
    if (movieLoading || castLoading) return <div>로딩 중...</div>;
    if (movieIsError) return <div>영화 정보 오류 발생: {movieError.message}</div>;
    if (castIsError) return <div>배우 정보 오류 발생: {castError.message}</div>;
    if (!movieData || !castData) return <div>영화 정보를 찾을 수 없습니다.</div>;

    // 감독님, 배우들 정보 확인
    const directors = movieData.credits?.crew?.filter(member => member.job === "Director") || [];
    const cast = castData.cast || [];

    return (
        <Container>
            <Header>
                {/* backdrop_path ➡️ 포스터 전체 보임 */}
                <BackgroundImage src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`} />
                <GradationEffect />
                <DescriptionText>
                    <MovieTitle>{movieData.title}</MovieTitle>
                    <MovieInformation>📆 {movieData.release_date}</MovieInformation>
                    <MovieInformation>⭐ {movieData.vote_average}</MovieInformation>
                    <MovieInformation>⌚ {movieData.runtime}분</MovieInformation>
                    <MovieOverview>{movieData.overview}</MovieOverview>
                </DescriptionText>
            </Header>
            <Divider />
            <EtcInformation>
                <h2>감독/출연</h2>
                <CastContainer>
                    {directors.map((member) => (
                        <CastInformationContainer key={member.id}>
                            <CastMemberImage src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name}/>
                            <CastName>감독: {member.name}</CastName>
                            <CastRole>{member.character}</CastRole>
                        </CastInformationContainer>
                    ))}
                    {cast.map((member) => (
                        <CastInformationContainer key={member.id}>
                            <CastMemberImage src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name}/>
                            <CastName>{member.name}</CastName>
                            <CastRole>{member.character}</CastRole>
                        </CastInformationContainer>
                    ))}
                </CastContainer>
            </EtcInformation>
        </Container>
    );
};

export default MovieDescription;
