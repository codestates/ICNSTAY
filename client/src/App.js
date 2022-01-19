import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Accommodation from './pages/Accommodation';
import Home from './pages/Home';
import SignUp from './pages/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Header isLoggedIn={true} />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/:id" element={<Accommodation />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
