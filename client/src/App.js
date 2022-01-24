import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const [isLogIn, setIsLogIn] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [visitedPage, setVisitedPage] = useState('/'); // 방문한 페이지 저장하는 스택
  // const [token, setToken, removeToken] = useCookies(['signInToken']);

  const getUser = async () => {
    try {
      const res = await axios.get('https://localhost:4000/userinfo');
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

  // console.log('App.js : ', user);

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
    const signOutRequest = await axios.post('https://localhost:4000/signout');
    if (signOutRequest.status === 205) {
      setUser(null);
      setIsLogIn(false);
      localStorage.clear();
      // removeToken('signInToken');
      // sessionStorage.removeItem('userInfo');
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

  // useEffect(
  //   () => isLogIn && localStorage.setItem('isLoggedIn', JSON.stringify(isLogIn)),
  //   [isLogIn]
  // );

  useEffect(() => user && localStorage.setItem('user', JSON.stringify(user)), [user]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header isLogIn={isLogIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route exact path="/" element={<Home setVisitedPage={setVisitedPage} />}></Route>
        <Route
          exact
          path="/signin"
          element={
            <SignIn handleResponseSuccess={handleResponseSuccess} visitedPage={visitedPage} />
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route
          path="/userinfo"
          element={
            <Mypage setIsLogIn={setIsLogIn} user={user} setUser={setUser} getUser={getUser} />
          }
        ></Route>

        <Route path="/biddinglist" element={<BiddingList />}></Route>

        <Route path="/accommodation/:id" element={<Accommodation />}></Route>
        <Route path="/signout" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
