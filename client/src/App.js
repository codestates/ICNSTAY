import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
import { useSelector, useDispatch } from 'react-redux';
import { setVisitedPage, setUser } from './actions';

axios.defaults.withCredentials = true;

function App() {
  // Get states from redux
  // const singInState = useSelector((state) => state.signinReducer);
  // const { isSignIn } = singInState;
  const [isLoading, setIsLoading] = useState(false);
  const visitedPageState = useSelector((state) => state.visitedPageReducer);
  const { visitedPage } = visitedPageState;
  // const userState = useSelector((state) => state.userReducer);
  // const { user } = userState;
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const res = await axios.get('https://localhost:4000/userinfo');
      const userInfo = res.data;
      if (userInfo) {
        const { id, email, mobile, username, social } = userInfo;
        setUser({ id, email, mobile, username, social });
      } else {
        setUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const isAuthenticated = () => {
    getUser();
  };

  const handleResponseSuccess = (accessToken) => {
    isAuthenticated();
    localStorage.setItem('isSignIn', true);
    localStorage.setItem('token', accessToken);
  };

  const handleSignOut = async () => {
    try {
      if (user.social === 'kakao') {
        console.log('소셜 로그아웃을 하셨습니다.');
        // const url = 'https://kapi.kakao.com/v1/user/logout';
        const accessToken = localStorage.getItem('token');
        console.log('로컬스토리지에서 가져온 액세스 토큰 :', accessToken);

        const headers = {
          accessToken,
          'Content-Type': 'application/json',
        };
        const result = await axios.post('https://localhost:4000/oauth/signout', {}, { headers });
        console.log('social logout data ', result.status);
        if (result.status === 205) {
          setUser(null);
          localStorage.clear();
        }
      } else {
        const signOutRequest = await axios.post('https://localhost:4000/signout');
        if (signOutRequest.status === 205) {
          setUser(null);
          // dispatch(setVisitedPage('/'));
          localStorage.clear();
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // console.log('최근 방문한 페이지:', visitedPage);
  }, [visitedPage]);

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('isSignIn')) {
      setIsSignIn(true);
      setUser(user);
    } else {
      setIsSignIn(false);
    }
  }, []);

  useEffect(() => user && localStorage.setItem('user', JSON.stringify(user)), [user]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header handleSignOut={handleSignOut} />
      <Routes>
        <Route
          exact
          path="/"
          element={<Home handleResponseSuccess={handleResponseSuccess} />}
        ></Route>
        <Route
          path="/signin"
          element={<SignIn handleResponseSuccess={handleResponseSuccess} />}
        ></Route>
        {/* 로그인 상태에서 "/signup" 페이지 이동시, "/"로 강제 이동 */}
        <Route path="/signup" element={isSignIn ? <Navigate to="/" /> : <SignUp />}></Route>
        {/* 로그인한 상태에서만 이용가능한 페이지: userinfo, biddinglist */}
        {/* 로그인 하지 않은 상태에서 위의 페이지들로 이동시, "/signin" 페이지로 강제 이동 */}
        <Route
          path="/userinfo"
          element={user ? <Mypage user={user} setUser={setUser} /> : <Navigate to="/signin" />}
        ></Route>
        <Route
          path="/biddinglist"
          element={user ? <BiddingList user={user} /> : <Navigate to="/signin" />}
        ></Route>
        <Route path="/accommodation/:id" element={<Accommodation />}></Route>
        <Route path="/signout" element={<Navigate to="/" />}></Route>
        <Route path="/preloader" element={<Preloader />}></Route>
        {/* 잘못된 주소 입력시 "/"로 강제 이동 */}
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
