import React from 'react';
// import { createGlobalStyle } from 'styled-components';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layout/root-layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Search from './pages/Search';
import MovieList from './pages/MovieList';
import NowPlaying from './movie-pages/nowPlaying';
import UpcomingPlaying from './movie-pages/UpcomingPlaying';
import PopularPlaying from './movie-pages/PopularPlaying';
import PrizedPlaying from './movie-pages/PrizedPlaying';

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: 'Arial', sans-serif;
//     background-color: #f0f0f0;
//     color: #333;
//   }

//   a {
//     text-decoration: none;
//     color: inherit;
//   }
// `;

const router = createBrowserRouter([
  {
      path: '/',
      element: <RootLayout />,
      children: [
          {
            index: true,
            element: <Home/>
          },
          {
            path: 'Login',
            element: <Login/>
          },
          {
            path: 'SignUp',
            element: <SignUp/>
          },
          {
            path: 'Search',
            element: <Search/>
          },
          {
            path: 'MovieList',
            element: <MovieList/>
          },
          {
            path: 'NowPlaying',
            element: <NowPlaying/>
          },
          {
            path: 'UpcomingPlaying',
            element: <UpcomingPlaying/>
          },
          {
            path: 'PopularPlaying',
            element: <PopularPlaying/>
          },
          {
            path: 'PrizedPlaying',
            element: <PrizedPlaying/>
          }
      ]
  },
]);

function App() {
  return (
    <>
      {/* <GlobalStyle/> */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;