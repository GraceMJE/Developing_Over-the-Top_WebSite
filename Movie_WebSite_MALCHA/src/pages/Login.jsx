import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import { useAuth } from '../context/AuthContext'; // useAuth import
import styled from 'styled-components';
import '../App.css';

const LoginButton = styled.button`
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

const Login = () => {
    const navigate = useNavigate(); // useNavigate 훅 사용
    const { login } = useAuth(); // 로그인 상태 변경 함수 가져오기

    // yup 스키마 정의
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('이메일 형식을 확인해주세요')
            .required('이메일을 입력해주세요'),
        password: yup
            .string()
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .required('비밀번호를 입력해주세요'),
    });

    // react-hook-form 설정
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    const [loading, setLoading] = useState(false); // 로딩 상태
    const [serverError, setServerError] = useState(null); // 서버 에러 상태

    // 폼 제출 처리 함수
    const onSubmit = async (data) => {
        // 로딩 상태 시작
        setLoading(true);
        setServerError(null); // 이전 에러 초기화

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // 사용자로부터 입력받은 데이터
            });

            const result = await response.json();

            if (response.ok) {
                // 로그인 성공 후, login 함수 호출하여 userName 설정
                login({ name: data.email.split('@')[0], token: result.token }); // 이메일 앞부분을 사용자 이름으로 설정
                alert('로그인 성공!');
                navigate('/Home'); // 로그인 후 홈 화면으로 이동
            } else {
                setServerError(result.message || '로그인에 실패했습니다.');
            }
        } catch (error) {
            setServerError('서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div className='signLoginContainer'>
            <form className='inputForm' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='signLoginTitle'>로그인</h1>

                {/* 이메일 입력 */}
                <input className='signLoginInputBox'
                    type="email"
                    {...register('email')}
                    placeholder="이메일을 입력하세요!"
                />
                {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

                {/* 비밀번호 입력 */}
                <input className='signLoginInputBox'
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호를 입력하세요!"
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                {/* 서버 에러 메시지 */}
                {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

                {/* 로그인 버튼 */}
                <LoginButton type="submit" disabled={!isValid || loading}>
                    {loading ? '로그인 중✨' : '로그인'}
                </LoginButton>
            </form>
        </div>
    );
};

export default Login;
