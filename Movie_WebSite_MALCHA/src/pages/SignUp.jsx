import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5%;
    height: 100vh; 
`;

const SignUpTitle = styled.h1`
    margin-bottom: 18px;
    font-family: monospace; 
    color: white;
    font-size: 21px;
    text-align: center;
`;

const SignUpBox = styled.input`
    width: 280px;
    height: 16px;
    border-radius: 11px;
    border: 2px solid pink;
    padding: 10px;
    margin: 6px 0;
    font-size: 12px;
    font-family: monospace;
`;

const SignUpButton = styled.button`
    width: 302px;
    height: 42px;
    border-radius: 11px;
    background-color: ${({ disabled }) => (disabled ? 'gray' : '#FF007F')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    text-align: center;
    font-size: 12px;
    font-family: monospace;
    letter-spacing: 3px;
    margin-top: 2.7px;
    color: white;
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: monospace;
    font-size: 11px;
    margin: 0;
    margin-left: 3px;
    margin-bottom: 5px;
`;

const SignUp = () => {
    const schema = yup.object().shape({
        email: yup.string().email('이메일 형식을 확인해주세요').required('사용가능한 이메일을 입력해주세요'),
        password: yup.string()
            .min(8, '비밀번호는 8자 이상입니다')
            .max(16, '비밀번호는 16자 이하입니다')
            .required('비밀번호를 입력해주세요'),
        passwordCheck: yup.string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 확인을 입력해주세요'),
    });

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
        criteriaMode: 'all',
    });

    const onSubmit = (data) => {
        console.log('폼 데이터 제출');
        console.log(data);
    };

    return (
        <SignUpContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SignUpTitle>회원가입</SignUpTitle>
                <SignUpBox type='email' {...register("email")} placeholder="이메일을 입력하세요!" />
                <ErrorMessage>{errors.email?.message}</ErrorMessage>
                
                <SignUpBox type='password' {...register("password")} placeholder="비밀번호를 입력하세요!(8~16자)" />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
                
                <SignUpBox type='password' {...register("passwordCheck")} placeholder="비밀번호를 다시 입력하세요!" />
                <ErrorMessage>{errors.passwordCheck?.message}</ErrorMessage>
                
                <SignUpButton type='submit' disabled={!isValid}>회원가입</SignUpButton>
            </form>
        </SignUpContainer>
    );
};

export default SignUp;