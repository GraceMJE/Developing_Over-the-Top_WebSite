// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // 로컬스토리지에서 로그인 상태 및 사용자 정보 가져오기
    useEffect(() => {
        const token = localStorage.getItem('AccessToken');
        const storedUserName = localStorage.getItem('UserName');
        if (token && storedUserName) {
            setIsLoggedIn(true);
            setUserName(storedUserName); // 로그인된 사용자의 이름
        }
    }, []);

    const login = (user) => {
        setIsLoggedIn(true);
        setUserName(user.name);
        localStorage.setItem('AccessToken', user.token);
        localStorage.setItem('UserName', user.name); // 사용자 이름 저장
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName('');
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('UserName');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
