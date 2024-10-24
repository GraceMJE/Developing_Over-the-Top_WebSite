import { Link } from "react-router-dom";
import styled from "styled-components";

const NavbarContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #191919;
    padding: 10px 20px;
`;

const SignUpAndIn = styled.div`
    display: flex; /* Flexbox로 정렬 */
    align-items: center;
`;

const Logo = styled.h1`
    font-family: monospace;
    font-size: 21px;
    margin: 0; /* 기본 마진 제거 */
`;

const Login = styled.span`
    font-size: 12px;
    margin-right: 20px; /* 버튼과 간격 추가 */
`;

const SignUpButton = styled.button`
    background-color: #FF007F;
    font-size: 12px;
    border-radius: 8px;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
    &:hover{background-color: pink;}
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo>
                <Link to='/' style={{ color: '#FF007F', textDecoration: 'none' }}>MALCHA</Link>
            </Logo>
            <SignUpAndIn>
                <Login>
                    <Link to='/Login' style={{ color: 'white', textDecoration: 'none' }}>로그인</Link>
                </Login>
                <SignUpButton>
                    <Link to='/SignUp' style={{ color: 'white', textDecoration: 'none' }}>회원가입</Link>
                </SignUpButton>
            </SignUpAndIn>
        </NavbarContainer>
    );
};

export default Navbar;
