import React from 'react';
import styled from 'styled-components';
import ImageItem from '../components/categoryImage';

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageContainer = styled.div`
    margin-left: 15px;
    margin-right: 15px;
    display: flex;
    justify-content: space-around;
`;

const MovieList = () => {
    return (
        <> 
            <CategoryContainer>
                <h2 style={{ color: 'white', marginLeft: '15px' }}>카테고리</h2>
                <ImageContainer>
                    <ImageItem to = '/NowPlaying' src = '/now.jpg' alt = '현재상영작'/>
                    <ImageItem to = '/PopularPlaying' src = '/popular.jpg' alt = '인기작' />
                    <ImageItem to = '/PrizedPlaying' src = '/prize.jpg' alt = '우수작' />
                    <ImageItem to = '/UpcomingPlaying' src = '/soon.jpg' alt = '개봉예정작' />
                </ImageContainer>
            </CategoryContainer>
        </>
    );
}

export default MovieList;