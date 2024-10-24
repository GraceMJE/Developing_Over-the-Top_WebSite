import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
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

    // ⭐새로 알게된 내용~! 배경이미지 위치조정!⭐
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
    left: 20px; /* 왼쪽 정렬 */
    z-index: 3; /* 텍스트를 최상단에 배치 */
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

// 구분선(br을 이용하지 않고 스타일 지정에 용이하게 div로 줬다.)
const Divider = styled.div`
    height: 0.5px;
    background-color: white;
    margin-left: 1.7%;
    margin-right: 66%;
`;

// 감독/배우 정보 등 부가정보를 담는 칸
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

// 감독님 및 배역들 상세정보 칸
const CastInformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    margin-bottom: 30px;
    width: auto;
`
const CastMemberImage = styled.img`
    border-radius: 50%;
    border: 2px solid white;
    width: 70px;
    height: 70px;

    // ⭐사진 비율유지하면서 크기 적용되기 위한 속성
    object-fit: cover;
    
    text-align: center;
    background-image: url(${props => props.src});
    margin: 0;
`;
const CastName = styled.p`
    font-size: 8px;
    letter-spacing: -0.3px;
    margin: 0;
    margin-top: 7px;
    margin-left: 0;
    text-align: center;
`;
const CastRole = styled.p`
    font-size: 7px;
    color: gray;
    margin: 0;
    margin-top: 3px;
    text-align: center;
`;

const MovieDescription = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // 🩷☁️ credit 추가 ☁️🩷
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${myAPIkey}&language=ko-KR&append_to_response=credits`);
                if (!response.data || !response.data.title) {
                    throw new Error("유효한 영화 정보를 찾을 수 없습니다.");
                }
                
                setMovie(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류 발생: {error.message}</div>;
    if (!movie) return <div>영화 정보를 찾을 수 없습니다.</div>;

    // 감독님, 배우들 정보 확인
    const directors = movie.credits?.crew?.filter(member => member.job === "Director") || [];
    const cast = movie.credits?.cast || [];

    return (
        <Container>
            <Header>
                <BackgroundImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
                <GradationEffect />
                <DescriptionText>
                    <MovieTitle>{movie.title}</MovieTitle>
                    <MovieInformation>📆 {movie.release_date}</MovieInformation>
                    <MovieInformation>⭐ {movie.vote_average}</MovieInformation>
                    <MovieInformation>⌚ {movie.runtime}분</MovieInformation>
                    <MovieOverview>{movie.overview}</MovieOverview>
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
