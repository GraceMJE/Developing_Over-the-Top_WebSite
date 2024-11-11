import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import styled from 'styled-components';
import '../App.css';

// 스타일링
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
    const navigate = useNavigate(); // useNavigate 훅 사용

    // yup 스키마 정의_유효성 checking
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('이메일 형식을 확인해주세요')
            .required('사용가능한 이메일을 입력해주세요'),
        password: yup
            .string()
            .min(8, '비밀번호는 8자 이상이어야 합니다.')
            .max(16, '비밀번호는 16자 이하이어야 합니다.')
            .required('비밀번호를 입력해주세요'),
        passwordCheck: yup
            .string()
            .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
            .required('비밀번호 확인을 입력해주세요'),
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
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST', // HTTP 메소드 (POST)
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // 사용자로부터 입력받은 데이터
            });

            const result = await response.json();

            // 응답 코드가 200 범위일 경우 성공 처리
            if (response.ok) {
                console.log('회원가입 성공:', result);
                alert('회원가입이 성공했습니다!');
                navigate('/Login'); // 회원가입 성공 후 로그인 페이지로 이동
            } else {
                // 에러가 있는 경우
                setServerError(result.message || '회원가입에 실패했습니다.');
            }
        } catch (error) {
            console.error('회원가입 중 오류 발생:', error);
            setServerError('서버와의 연결에 문제가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <div className='signLoginContainer'>
            <form className='inputForm' onSubmit={handleSubmit(onSubmit)}>
                <h1 className='signLoginTitle'>회원가입</h1>

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
                    placeholder="비밀번호를 입력하세요!(8~16자)"
                />
                {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}

                {/* 비밀번호 확인 입력 */}
                <input className='signLoginInputBox'
                    type="password"
                    {...register('passwordCheck')}
                    placeholder="비밀번호를 다시 입력하세요!"
                />
                {errors.passwordCheck && <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>}

                {/* 서버 에러 메시지 */}
                {serverError && <ErrorMessage>{serverError}</ErrorMessage>}

                {/* 회원가입 버튼 */}
                <SignUpButton type="submit" disabled={!isValid || loading}>
                    {loading ? '회원가입 중✨' : '회원가입'}
                </SignUpButton>
            </form>
        </div>
    );
};

export default SignUp;
