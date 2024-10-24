import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ImageLink = styled(Link)`
    cursor: point;
`;

const ImageItem = ({to, src, alt}) => {
    return (
        <ImageLink to={to}>
            <img src={src} alt={alt} style={{ width: '230px', height: 'auto', 
                borderRadius: '11px' }}/>
        </ImageLink>
    );
}

export default ImageItem;