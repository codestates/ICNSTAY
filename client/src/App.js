import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';

import Home from './pages/Home';
import Mypage from './pages/Mypage';

function App() {
  return (
    <BrowserRouter>
      <Header isLoggedIn={true} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/userinfo" element={<Mypage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
