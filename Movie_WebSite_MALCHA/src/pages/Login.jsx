import styled from "styled-components";
import {useState} from "react";
import useForm from "../hooks/use-form";
import { validateLogin } from "../utils/validate";

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center; - 수직(위아래)중앙
    margin-top: 5%;
    height: 100vh; 
`;

const LoginTitle = styled.h1`
    margin-bottom: 18px;
    font-family: monospace; 
    color: white;
    font-size: 21px;
    text-align: center;
`

const LoginBox = styled.input`
    width: 280px;
    height: 16px;
    border-radius: 11px;
    border: 2px solid pink;
    padding: 10px;
    margin: 6px 0;
    font-size: 12px;
    font-family: monospace;
`

const LoginButton = styled.button`
    width: 302px;
    height: 42px;
    border-radius: 11px;

    // 로그인 입력칸 조건 충분하지 않을 경우 버튼 색상 GREY로 설정
    background-color: ${({ disabled }) => (disabled ? 'gray':'#FF007F')};
    // & 버튼 비활성화
    cursor: ${({ disabled }) => (disabled ? 'not-allowed':'pointer')};

    text-align: center;
    font-size: 12px;
    font-family: monospace;
    letter-spacing: 3px;
    margin-top: 2.7px;
    color: white;
`

const ErrorMessage = styled.p`
    color: red;
    font-family: monospace;
    font-size: 11px;
    margin:0;
    margin-left: 1px;
    margin-bottom: 5px;
`

const Login = () => {
    const login = useForm({
        initialValue: {
            email: '',
            password: '',
        },
        validate: validateLogin
    });

    const handlePressLogin = () => {
        console.log(login.values.email, login.values,password)
    }

    return (
        <LoginContainer>
            <LoginTitle>로그인</LoginTitle>
            <LoginBox type={'email'} placeholder={'이메일을 입력해주세요'} {...login.getTextInputProps('email')}/>
            {login.touched.email && login.errors.email && <ErrorMessage>{login.errors.email}</ErrorMessage>}
            <LoginBox type={'password'} placeholder={'비밀번호를 입력해주세요'} {...login.getTextInputProps('password')}/>
            {login.touched.password && login.errors.password && <ErrorMessage>{login.errors.password}</ErrorMessage>}
            <LoginButton onClick={handlePressLogin}>로그인</LoginButton>
        </LoginContainer>
    );
}

export default Login;