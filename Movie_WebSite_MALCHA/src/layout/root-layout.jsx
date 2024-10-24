import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styled from 'styled-components';

const ContentContainer = styled.div`
    background-color: black;
    display: flex;
    flex-direction: row;
    height: 100%;
`;

const RootLayer = () => {
    return (
        <>
            <div>
                <Navbar/>
                <ContentContainer>
                    <Sidebar/>
                    <div style={{ flex: 1 }}> {/* Outlet을 감싸는 div */}
                        <Outlet />
                    </div>
                </ContentContainer>
            </div>
        </>
    );
};

export default RootLayer;