import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../data/logo.png';
import kakaoIcon from '../data/kakaoIcon.png';
import { sha256 } from 'js-sha256';
import axios from 'axios'
const KakaoIcon = styled.img.attrs({
  src: `${kakaoIcon}`,
})`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 32%;
  transform: translate(-50%, -50%);
`;

const LayOut = styled.div`
  height: 100vh;
  width: 100vw;
  border: 1px dotted red;
  position: relative;
`;

const LoginContainer = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
`;

const LoginIdInput = styled.input`
  width: 400px;
  font-size: 1.1rem;
  padding: 0.4rem;
  margin: 0.4rem;
  border: ${(props) => props.thickness} solid ${(props) => props.color};
  border-radius: 5px;
`;

const LoginPasswordInput = styled.input.attrs((props) => ({
  type: 'password',
}))`
  width: 400px;
  font-size: 1.1rem;
  padding: 0.4rem;
  margin: 0.4rem;
  border-radius: 5px;
`;

const LoginButton = styled.button`
  width: 416.5px;
  font-size: 1.1rem;
  padding: 0.4rem;
  margin: 0.4rem;
`;

const Logo = styled.img`
  src: ${(props) => props.src};
  width: 125px;
  height: 100%;
  cursor: pointer;
`;

const SignUpLink = styled.div`
  width: 420px;
  text-align: right;
  margin-bottom: 0.3rem;
  text-decoration: none;
`;

const SocialLoginButton = styled.button`
  width: 416.5px;
  font-size: 1.1rem;
  padding: 0.4rem;
  margin: 0.4rem;
  position: relative;
  background-color: rgb(254, 229, 0);
  border-radius: 5px;
`;

const ErrorMessageBox = styled.div`
  width: 400px;
  font-size: 1.1rem;
  padding: 0.4rem;
  margin: 0.4rem;
  text-align: center;
  color: red;
`;

axios.defaults.withCredentials = true;

const SignIn = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { email, password } = loginInfo;
  const [isLogin, setIslogin] = useState(false) // 나중에 리덕스 패턴 적용하면 없앨 거지만 일단 임시로 로그인 스테이트를 추가함

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLoginButton = async () => {
    console.log('login button clicked');
    let regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      // alert('유효하지 않은 이메일 형식입니다. 올바른 이메일을 입력해주십시오')
      setErrorMessage('올바른 이메일 형식이 아닙니다!');
    } else {
      setErrorMessage('');
    }
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요!');
    }
    console.log(email, password);
    const signInRequest = await axios.post('/signin', {
      email,
      password: sha256(password),
    });
   
    if (signInRequest.status === 200) { // 로그인에 성공했을 때 
      console.log(signInRequest) //포스트 요청 바디가 제대로 들어갔는지 확인
      setIslogin(true);
      navigate('/');
    }
  };

  const handleSocialLoginButton = () => {
    console.log('social login button clicked');
  };

  return (
    <div>
      <LayOut>
        <LoginContainer>
          <Logo src={logo} />
          <br />
          <LoginIdInput
            placeholder="email"
            onChange={handleInputValue('email')}
            color={errorMessage !== '올바른 이메일 형식이 아닙니다!' ? 'black' : 'red'}
            thickness={errorMessage !== '올바른 이메일 형식이 아닙니다!' ? '1px' : '3px'}
          />
          <br />
          <LoginPasswordInput placeholder="password" onChange={handleInputValue('password')} />
          <br />
          <LoginButton onClick={handleLoginButton}>sign in</LoginButton>
          <br />

          {errorMessage !== '' ? <ErrorMessageBox>{errorMessage}</ErrorMessageBox> : null}
          <SignUpLink>
            <Link to="/signup">sign up</Link>
          </SignUpLink>
          <SocialLoginButton onClick={handleSocialLoginButton}>
            <KakaoIcon />
            &nbsp;&nbsp;&nbsp;sign in with kakao
          </SocialLoginButton>
        </LoginContainer>
      </LayOut>
    </div>
  );
};

export default SignIn;
