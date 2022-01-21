import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
  const [user, setUser] = useState(null);

  const isAuthenticated = async () => {
    const res = await axios.get('https://localhost:4000/userinfo');
    const data = res.data;
    if (data) {
      const { id, email, mobile, username } = data;
      setUser({ id, email, mobile, username });
      setIsLogIn(true);
    } else {
      setUser(null);
    }
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  const handleSignOut = async () => {
    const signOutRequest = await axios.post('https://localhost:4000/signout');
    if (signOutRequest.status === 205) {
      setUser(null);
      setIsLogIn(false);
    }
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header isLogIn={isLogIn} handleSignOut={handleSignOut} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          exact
          path="/signin"
          element={<SignIn handleResponseSuccess={handleResponseSuccess} />}
        ></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="/accomotation/:id" element={<Accommodation />}></Route>

        <Route path="/userinfo" element={<Mypage />}></Route>
        <Route path="/biddinglist" element={<BiddingList />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route path="/accommodation/:id" element={<Accommodation />}></Route>
        <Route path="/signout" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
