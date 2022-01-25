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
import { useSelector } from 'react-redux';

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

const SignIn = ({ handleResponseSuccess }) => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const { email, password } = loginInfo;

  const visitedPageState = useSelector(state => state.visitedPageReducer);
  const { visitedPage } = visitedPageState;

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLoginButton = async () => {
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
    try {
      const signInRequest = await axios.post('https://localhost:4000/signin', {
        email,
        password: sha256(password),
      });
      if (signInRequest) {
        const accessToken = signInRequest.data.accessToken;
        handleResponseSuccess(accessToken);
        navigate(visitedPage);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage('가입되지 않은 이메일이거나 잘못된 비밀번호 입니다');
    }
  };

  const handleSocialLoginButton = async () => {
    const REST_API_KEY = process.env.REACT_APP_KAKAO_CLIENT_ID; //나중에 환경변수로 등록할 것!
    try {
      await window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=https://localhost:3000&response_type=code`
      );
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
