import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';

const NavbarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191919;
    padding: 10px 20px;
`;

const SignUpAndIn = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled.h1`
    font-family: monospace;
    font-size: 21px;
    margin: 0;
`;

const LoginText = styled.span`
    font-size: 12px;
    margin-right: 20px;
`;

const SignUpButton = styled.button`
    background-color: #FF007F;
    font-size: 12px;
    border-radius: 8px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: pink;
    }
`;

const UserGreeting = styled.span`
    color: white;
    font-size: 14px;
    margin-right: 20px;
`;

const LogoutButton = styled.button`
    background-color: #FF007F;
    font-size: 12px;
    border-radius: 8px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
    &:hover {
        background-color: pink;
    }
`;

const Navbar = () => {
    const { isLoggedIn, userName, logout } = useAuth(); // Context에서 로그인 상태와 유저 정보 가져오기

    return (
        <NavbarContainer>
            <Logo>
                <Link to="/Home" style={{ color: '#FF007F', textDecoration: 'none' }}>MALCHA</Link>
            </Logo>
            {isLoggedIn ? (
                <SignUpAndIn>
                    <UserGreeting>{userName}님 환영합니다!</UserGreeting>
                    <LogoutButton onClick={logout}>로그아웃</LogoutButton>
                </SignUpAndIn>
            ) : (
                <SignUpAndIn>
                    <LoginText>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
                    </LoginText>
                    <SignUpButton>
                        <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
                    </SignUpButton>
                </SignUpAndIn>
            )}
        </NavbarContainer>
    );
};

export default Navbar;
