import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaSearch, FaFilm } from 'react-icons/fa'

const SidebarContainer = styled.aside`
    width: 125px;
    background-color: #191919;
    padding: 15px;
    height: 100vh;
`;

const SidebarList = styled.ul`
    color: white;
    padding: 0;
    list-style-type: none;
`;

const Lists = styled.li`
    font-size: 12px;
    font-family: sans;
    font-weight: bolder;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;

const IconLink = styled(Link)`
    color: white; /* 링크 색상 설정 */
    text-decoration: none; /* 밑줄 제거 */
    display: flex; /* 아이콘과 텍스트 수평 정렬 */
    align-items: center; /* 아이콘과 텍스트 정렬 */
`;

const Sidebar = () => {
    return (
        <SidebarContainer>
            <SidebarList>
            <Lists>
                    <IconLink to="/Search">
                        <FaSearch style={{ marginRight: '8px' }} />
                        찾기
                    </IconLink>
                </Lists>
                <Lists>
                    <IconLink to="/MovieList">
                        <FaFilm style={{ marginRight: '8px' }} />
                        영화
                    </IconLink>
                </Lists>
            </SidebarList>
        </SidebarContainer>
    );
};

export default Sidebar;