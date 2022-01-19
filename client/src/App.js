import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Accommodation from './pages/Accommodation';
import Home from './pages/Home';
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Header isLoggedIn={true} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/userinfo" element={<Mypage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/:id" element={<Accommodation />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
