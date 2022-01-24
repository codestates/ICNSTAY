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

const SignIn = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const { email, password } = loginInfo;
  const [isLogin, setIslogin] = useState(false); // 나중에 리덕스 패턴 적용하면 없앨 거지만 일단 임시로 로그인 스테이트를 추가함

  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLoginButton = async () => {
    console.log('login button clicked');
    let regEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (!regEmail.test(email)) {
      // alert('유효하지 않은 이메일 형식입니다. 올바른 이메일을 입력해주십시오')
      setErrorMessage('올바른 이메일 형식이 아닙니다');
    } else {
      setErrorMessage('');
    }
    if (!email || !password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    }
    console.log(email, password);
    const signInRequest = await axios.post('/signin', {
      email,
      password: sha256(password),
    });

    if (signInRequest.status === 200) {
      // 로그인에 성공했을 때
      console.log(signInRequest); //포스트 요청 바디가 제대로 들어갔는지 확인
      setIslogin(true);
      navigate('/');
    }
  };

  const handleSocialLoginButton = () => {
    console.log('social login button clicked');
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
