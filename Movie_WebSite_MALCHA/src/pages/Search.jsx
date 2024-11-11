import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryMovieList from '../components/categoryMovieList';
import { useNavigate, useLocation } from 'react-router-dom';  // react-router-dom 사용
import { myAPIkey } from '../myAPI';  // API 키 가져오기

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  margin-left: 14%;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 15px 0 0 0;
`;

const SearchButton = styled.button`
  background-color: #FF007F;
  width: 80px;
  height: 43px;
  color: white;
  padding: 10px 20px;
  margin: 14px 15px 16px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: pink;
  }
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [fetchURL, setFetchURL] = useState(''); // 영화 데이터를 가져올 URL
  const [debouncedQuery, setDebouncedQuery] = useState(''); // 디바운스된 검색어 상태
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 쿼리 파라미터를 가져와서 검색어 상태를 설정
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearchQuery(query);
      setFetchURL(`https://api.themoviedb.org/3/search/movie?api_key=${myAPIkey}&query=${query}&language=ko-KR`);
    }
  }, [location.search]);

  // 디바운스 처리 (검색어 입력 후 일정 시간 후에 API 호출)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery.trim()) {
        setFetchURL(`https://api.themoviedb.org/3/search/movie?api_key=${myAPIkey}&query=${debouncedQuery}&language=ko-KR`);
      }
    }, 500); // 500ms 후에 API 호출

    return () => clearTimeout(timer); // 타이머 정리
  }, [debouncedQuery]);

  // 검색어 입력 변경
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setDebouncedQuery(value); // 디바운스된 검색어 상태를 설정
  };

  // 검색 버튼 클릭 시 URL에 검색어 추가
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`?query=${searchQuery}`); // URL에 query 파라미터 추가
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick(); // 엔터키가 눌리면 검색 실행
    }
  };

  return (
    <SearchContainer>
      <SearchBar>
        <SearchBarInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown} // 엔터 키 입력을 처리
          placeholder="영화 제목을 입력해주세요..."
        />
        <SearchButton onClick={handleSearchClick}>검색</SearchButton>
      </SearchBar>

      {/* fetchURL이 설정되면 영화 목록을 보여줌 */}
      {fetchURL && <CategoryMovieList fetchURL={fetchURL} />}
    </SearchContainer>
  );
};

export default Search;
