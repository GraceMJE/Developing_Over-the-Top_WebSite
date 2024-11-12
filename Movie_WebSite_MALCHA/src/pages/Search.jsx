import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import { useNavigate, useLocation } from 'react-router-dom';
import { myAPIkey } from '../myAPI';
import CategoryMovieList from '../components/categoryMovieList';

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

const NoResultsMessage = styled.div`
  font-size: 18px;
  color: white;
  text-align: center;
  margin-top: 20px;
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [fetchURL, setFetchURL] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);

  // URL에서 쿼리 파라미터를 가져와서 검색어 상태를 설정
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearchQuery(query);
      setDebouncedQuery(query);
    }
  }, [location.search]);

  // 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery.trim()) {
        setFetchURL(`https://api.themoviedb.org/3/search/movie?api_key=${myAPIkey}&query=${debouncedQuery}&language=ko-KR`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedQuery]);

  // 영화 데이터 가져오기
  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setHasNextPage(data.page < data.total_pages);
    } catch (error) {
      console.error('영화 데이터 가져오기 실패', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 검색어 입력 변경
  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    setDebouncedQuery(value);
  };

  // 검색 버튼 클릭
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`?query=${searchQuery}`); 
    }
  };

  // 엔터 키 입력 시 검색 실행
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  // 스크롤 이벤트 핸들러
  const onScroll = () => {
    const container = containerRef.current;
    if (container) {
      const bottom = container.getBoundingClientRect().bottom <= window.innerHeight;
      if (bottom && !isFetchingNextPage && hasNextPage) {
        setIsFetchingNextPage(true);
        fetchMovies(fetchURL);
      }
    }
  };

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', onScroll);
    }

    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', onScroll);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchURL]);

  useEffect(() => {
    if (fetchURL) {
      fetchMovies(fetchURL);
    }
  }, [fetchURL]);

  // "검색 결과가 없습니다." 메시지 표시 조건
  const showNoResultsMessage = movies.length === 0 && !isLoading && searchQuery.trim();

  return (
    <SearchContainer>
      <SearchBar>
        <SearchBarInput
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          placeholder="영화 제목을 입력해주세요..."
          onFocus={() => {
            if (searchQuery) {
              setSearchQuery(''); // 검색창 클릭 시 검색어를 지움
            }
          }}
        />
        <SearchButton onClick={handleSearchClick}>검색</SearchButton>
      </SearchBar>

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <ClipLoader color="#FF007F" loading={isLoading} size={50} />
        </div>
      )}

      {movies.length > 0 && (
        <CategoryMovieList
          movies={movies}
          sourceURL={(path) => `https://image.tmdb.org/t/p/w500${path}`}
          isLoading={isLoading}
          fetchNextPage={fetchMovies}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      )}

      {showNoResultsMessage && (
        <NoResultsMessage>검색 결과가 없습니다.</NoResultsMessage>
      )}
    </SearchContainer>
  );
};

export default Search;
