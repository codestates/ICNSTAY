import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import styled from 'styled-components';
import axios from 'axios';
import { Container } from '../styles/Container';
import { Button } from '../styles/Button';
import { Input } from '../styles/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

import logo from '../data/logo.png';

const LoginContainer = styled.div`
  width: 500px;
  height: 450px;
  border: 1px solid black;
  text-align: center;
  padding: 0.8em;
  margin: 0.8em;
`;

const Logo = styled.img`
  src: ${(props) => props.src};
  width: 125px;
  cursor: pointer;
`;

const ErrorMessageBox = styled.div`
  padding: 0.4rem;
  margin: 0.4rem;
  text-align: center;
  color: red;
`;

axios.defaults.withCredentials = true;

const SignIn = ({ handleResponseSuccess, visitedPage, handleSocialLogin }) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { email, password } = loginInfo;

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLoginButton = async () => {
    // console.log('login button clicked');
    let regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      setErrorMessage('올바른 이메일 형식이 아닙니다');
    } else {
      setErrorMessage('');
    }
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    }
    // console.log(email, password);
    try {
      const signInRequest = await axios.post('https://localhost:4000/signin', {
        email,
        password: sha256(password),
      });

      if (signInRequest) {
        handleResponseSuccess();
        navigate(visitedPage);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('가입되지 않은 이메일이거나 잘못된 비밀번호 입니다');
    }
  };

  const handleSocialLoginButton = async () => {  
    const REST_API_KEY = '8c7f2d24ac16c0f2a4d3dc987439ddbb'; //나중에 환경변수로 등록할 것! 
    const redirect_uri = 'https://localhost:3000'

    try {
      await window.location.assign(`https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirect_uri}&response_type=code`);
      // const url = await new URL(window.location.href);
      // const authorizationCode = await url.searchParams.get('code');
      // await console.log(authorizationCode);
      // handleSocialLogin();
      // await axios.post('https://kauth.kakao.com/oauth/token', 
      // {
      //   grant_type: "authorization_code",
      //   client_id: REST_API_KEY,
      //   redirect_uri,
      //   code: authorizationCode
      // }, 
      // {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      //   }
      // });
      // 서버에서 해당 uri와 헤더 및 바디로 post 요청을 보내야 됨!
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Logo src={logo} width={'125px'} />
        <Input type="text" placeholder="email" onChange={handleInputValue('email')} />
        <Input type="password" placeholder="password" onChange={handleInputValue('password')} />
        {errorMessage !== '' ? <ErrorMessageBox>{errorMessage}</ErrorMessageBox> : null}
        <Button onClick={handleLoginButton}>SIGN IN</Button>
        <Link to="/signup">
          <Button>SIGN UP</Button>
        </Link>
        <Button onClick={handleSocialLoginButton} kakao>
          <FontAwesomeIcon icon={faComment} size="1x" color="#181600" /> SIGN IN WITH KAKAO
        </Button>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
