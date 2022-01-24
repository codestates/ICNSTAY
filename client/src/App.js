import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Accommodation from './pages/Accommodation';
import BiddingList from './pages/BiddingList';
import GlobalStyle from './styles/GlobalStyle';
import Preloader from './components/Preloader';

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [visitedPage, setVisitedPage] = useState('/'); // 방문한 페이지 저장하는 스택
  // const [token, setToken, removeToken] = useCookies(['signInToken']);

  const getUser = async () => {
    try {
      const res = await axios.get('https://localhost:4000/userinfo');
      setIsLoading(false);
      const userInfo = res.data;
      if (userInfo) {
        const { id, email, mobile, username } = userInfo;
        setUser({ id, email, mobile, username });
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isAuthenticated = async () => {
    getUser();
  };

  const handleResponseSuccess = (accessToken) => {
    isAuthenticated();
    setIsLogIn(true);
    localStorage.setItem('token', accessToken);
    // setToken('signInToken', accessToken);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    const signOutRequest = await axios.post('https://localhost:4000/signout');
    setIsLoading(false);
    if (signOutRequest.status === 205) {
      setUser(null);
      setIsLogIn(false);
      localStorage.clear();
      // removeToken('signInToken');
    }
  };

  useEffect(() => {
    console.log('최근 방문한 페이지:', visitedPage);
  }, [visitedPage]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLogIn(true);
      setUser(user);
    } else {
      setIsLogIn(false);
    }
  }, []);

  useEffect(() => user && localStorage.setItem('user', JSON.stringify(user)), [user]);
  console.log('App.js:', user);
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header isLogIn={isLogIn} handleSignOut={handleSignOut} />
      {isLoading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            exact
            path="/"
            element={<Home setVisitedPage={setVisitedPage} setIsLoading={setIsLoading} />}
          ></Route>
          <Route
            exact
            path="/signin"
            element={
              <SignIn
                handleResponseSuccess={handleResponseSuccess}
                visitedPage={visitedPage}
                setIsLoading={setIsLoading}
              />
            }
          ></Route>
          {/* 로그인 상태에서 "/signup" 페이지 이동시, "/"로 강제 이동 */}
          <Route
            path="/signup"
            element={isLogIn ? <Navigate to="/" /> : <SignUp setIsLoading={setIsLoading} />}
          ></Route>
          {/* 로그인한 상태에서만 이용가능한 페이지: userinfo, biddinglist */}
          {/* 로그인 하지 않은 상태에서 위의 페이지들로 이동시, "/signin" 페이지로 강제 이동 */}
          <Route
            path="/userinfo"
            element={
              !user ? (
                <Navigate to="/signin" />
              ) : (
                <Mypage
                  setIsLogIn={setIsLogIn}
                  user={user}
                  setUser={setUser}
                  setIsLoading={setIsLoading}
                />
              )
            }
          ></Route>
          <Route
            path="/biddinglist"
            element={
              !user ? (
                <Navigate to="/signin" />
              ) : (
                <BiddingList setIsLoading={setIsLoading} user={user} />
              )
            }
          ></Route>
          <Route
            path="/accommodation/:id"
            element={<Accommodation isLogIn={isLogIn} setIsLoading={setIsLoading} />}
          ></Route>
          <Route path="/signout" element={<Home setIsLoading={setIsLoading} />}></Route>
          <Route path="/preloader" element={<Preloader />}></Route>
          {/* 잘못된 주소 입력시 "/"로 강제 이동 */}
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
