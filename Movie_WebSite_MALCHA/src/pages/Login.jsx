import React from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';


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
    margin-left: 3px;
    margin-bottom: 5px;
`

const Login = () => {
    const schema = yup.object().shape({
        email: yup.string().email().required('이메일을 입력해주세요.'),
        password: yup.string().min(8, '비밀번호는 8자 이상입니다').max(16, '비밀번호는 16자 이하입니다').required(),
    })

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange', // 입력 필드의 변화에 따라 유효성을 체크합니다.
        criteriaMode: 'all', // 모든 에러 메시지를 표시합니다.
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출')
        console.log(data);
    }

    return (
        <>
            <LoginContainer>
                <form onSubmit = {handleSubmit(onSubmit)}>
                    <LoginTitle>로그인</LoginTitle>
                    <LoginBox input type={'email'} {...register("email")}/>
                    <ErrorMessage style={{color: 'red'}}>{errors.email?.message}</ErrorMessage>
                    <LoginBox type={'password'} {...register("password")}/>
                    <ErrorMessage style={{color: 'red'}}>{errors.password?.message}</ErrorMessage>
                    <LoginButton type='submit' disabled={!isValid}>로그인</LoginButton>
                </form>
            </LoginContainer>
        </>
    );
};

export default Login;