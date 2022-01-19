import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
// <<<<<<< HEAD
// =======
import Mypage from './pages/Mypage';
import SignUp from './pages/SignUp';
// >>>>>>> 188786b5f42c107589c3623ca9175456190cb090
import SignIn from './pages/SignIn';

function App() {
  return (
    <BrowserRouter>
      <Header isLoggedIn={true} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/userinfo" element={<Mypage />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route exact path="/signin" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
