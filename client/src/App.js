import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import { useCookies } from 'react-cookie';
=======
// import { useCookies } from 'react-cookie';
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
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
<<<<<<< HEAD
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState();
  const [visitedPage, setVisitedPage] = useState('/'); // 방문한 페이지 저장하는 스택
  const [token, setToken, removeToken] = useCookies(['signInToken']);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get('https://localhost:4000/userinfo');
      setIsLoading(false);
=======
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [visitedPage, setVisitedPage] = useState('/'); // 방문한 페이지 저장하는 스택
  // const [token, setToken, removeToken] = useCookies(['signInToken']);

  const getUser = async () => {
    try {
      const res = await axios.get('https://localhost:4000/userinfo');
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
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

<<<<<<< HEAD
=======

  // console.log('App.js : ', user);
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
  const isAuthenticated = async () => {
    getUser();
  };

  const handleResponseSuccess = (accessToken) => {
    isAuthenticated();
    setIsLogIn(true);
<<<<<<< HEAD
    setToken('signInToken', accessToken);
=======
    localStorage.setItem('token', accessToken);
    // setToken('signInToken', accessToken);
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    const signOutRequest = await axios.post('https://localhost:4000/signout');
    setIsLoading(false);
    if (signOutRequest.status === 205) {
      setUser(null);
      setIsLogIn(false);
<<<<<<< HEAD
      removeToken('signInToken');
=======
      localStorage.clear();
      // removeToken('signInToken');
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
      // sessionStorage.removeItem('userInfo');
    }
  };

<<<<<<< HEAD
  console.log(user);

=======
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
  useEffect(() => {
    console.log('최근 방문한 페이지:', visitedPage);
    const loggedInUser = localStorage.getItem("user");
    console.log(loggedInUser)
  }, [visitedPage]);

  useEffect(() => {
<<<<<<< HEAD
    if (token.signInToken) {
      setIsLogIn(true);
=======
    if (localStorage.getItem('token')) {
      setIsLogIn(true);
      setUser(user);
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
    } else {
      setIsLogIn(false);
    }
  }, []);

<<<<<<< HEAD
  // useEffect(() => sessionStorage.setItem('userInfo', JSON.stringify(user)), [user]);
=======
  // useEffect(
  //   () => isLogIn && localStorage.setItem('isLoggedIn', JSON.stringify(isLogIn)),
  //   [isLogIn]
  // );

  useEffect(() => user && localStorage.setItem('user', JSON.stringify(user)), [user]);
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header isLogIn={isLogIn} handleSignOut={handleSignOut} />
      {isLoading ? <Preloader /> :
      <Routes>
        <Route exact path="/" element={<Home setVisitedPage={setVisitedPage} setIsLoading={setIsLoading} />}></Route>
        <Route
          exact
          path="/signin"
          element={
<<<<<<< HEAD
            <SignIn handleResponseSuccess={handleResponseSuccess} visitedPage={visitedPage} setIsLoading={setIsLoading} />
          }
        ></Route>
        <Route path="/signup" element={<SignUp setIsLoading={setIsLoading}/>}></Route>
=======
            <SignIn handleResponseSuccess={handleResponseSuccess} visitedPage={visitedPage} />
          }
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac

        <Route
          path="/userinfo"
          element={
<<<<<<< HEAD
            <Mypage setIsLogIn={setIsLogIn} user={user} setUser={setUser} getUser={getUser} setIsLoading={setIsLoading}/>
          }
        ></Route>

        <Route path="/biddinglist" element={<BiddingList setIsLoading={setIsLoading}/>}></Route>
        <Route path="/accommodation/:id" element={<Accommodation isLogIn={isLogIn} setIsLoading={setIsLoading}/>}></Route>
        <Route path="/signout" element={<Home setIsLoading={setIsLoading} />}></Route>
        <Route path="/preloader" element={<Preloader />}></Route>
      </Routes>}
=======
            <Mypage setIsLogIn={setIsLogIn} user={user} setUser={setUser} getUser={getUser} />
          }
        ></Route>

        <Route path="/biddinglist" element={<BiddingList />}></Route>
        <Route path="/accommodation/:id" element={<Accommodation isLogIn={isLogIn}/>}></Route>
        <Route path="/signout" element={<Home />}></Route>
      </Routes>
>>>>>>> c086d84e0dc0f0a10ffb98f6795b77be103cf3ac
    </BrowserRouter>
  );
}

export default App;
