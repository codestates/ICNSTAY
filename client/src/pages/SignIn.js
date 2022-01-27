import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { Container, ErrorMessage, Header } from '../styles/Container';
import { Button } from '../styles/Button';
import { Input } from '../styles/Input';

const LoginContainer = styled.div`
  width: 350px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
  }
`;

const SignInBox = styled.div`
  width: 100%;
  margin-top: 0.8em;
`;

const ButtonBox = styled.div`
  margin-top: 0.4em;
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
  const visitedPageState = useSelector((state) => state.visitedPageReducer);
  const { visitedPage } = visitedPageState;

  const isValidEmailFormat = (string) => {
    let format = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    return format.test(string);
  };

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleInfo = () => {
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    }
    if (!isValidEmailFormat(email)) {
      setErrorMessage('올바른 이메일 형식이 아닙니다');
    }
    if (isValidEmailFormat(email) && password) {
      setErrorMessage('');
      handleLoginButton();
    }
  };

  const handleLoginButton = async () => {
    try {
      const signInRequest = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, {
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
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI
    try {
      await window.location.assign(
        `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Header>LOGIN</Header>
        <SignInBox>
          <Input type="text" placeholder="이메일" onChange={handleInputValue('email')} />
          <Input type="password" placeholder="비밀번호" onChange={handleInputValue('password')} />
          {errorMessage !== '' ? <ErrorMessage type={'login'}>{errorMessage}</ErrorMessage> : null}
        </SignInBox>
        <ButtonBox>
          <Button onClick={handleInfo}>로 그 인</Button>
          <Link to="/signup">
            <Button>회 원 가 입</Button>
          </Link>
          <Button onClick={handleSocialLoginButton} kakao>
            <FontAwesomeIcon icon={faComment} size="1x" color="#181600" /> 카카오 로그인
          </Button>
        </ButtonBox>
      </LoginContainer>
    </Container>
  );
};

export default SignIn;
