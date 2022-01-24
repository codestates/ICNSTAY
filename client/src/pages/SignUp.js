import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import { SignupModal } from '../components/Modal';
import { Container } from '../styles/Container';
import { Input } from '../styles/Input';
import { Button } from '../styles/Button';

const SignUpContainer = styled.div`
  width: 500px;
  height: 550px;
  border: 1px solid black;
  text-align: center;
  padding: 1em;
  margin: 1em;
`;

const SignUpHeader = styled.div`
  font-size: 18px;
  margin-bottom: 1em;
`;

const SignUpBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoxLabel = styled.div`
  width: 15%;
`;

const BoxInput = styled.div`
  width: 85%;
  position: relative;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ff0000;
  position: absolute;
  bottom: -5px;
  left: 40px;
`;

const ButtonBox = styled.div`
  margin-top: 0.8em;
`;

const SignUp = () => {
  // Setup variances
  const history = useNavigate();
  // Input data variances
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [mobile, setMobile] = useState();
  // Event handlers
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    isValidEmailFormat(event.target.value) ? setIsValidEmail(true) : setIsValidEmail(false);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePasswordCheck = (event) => {
    setPasswordCheck(event.target.value);
    isSamePassword(password, event.target.value)
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  };
  const handleChangeMobile = (event) => {
    setMobile(event.target.value);
    isValidMobileFormat(event.target.value) ? setIsValidMobile(true) : setIsValidMobile(false);
  };
  const handleSuccessModal = () => {
    history('/signin');
  }
  const handleSignupSubmit = async () => {
    const userInformation = {
      email: email,
      username: name,
      password: sha256(password),
      mobile: mobile,
    };
    try {
      const response = await axios.post('https://localhost:4000/signup', userInformation);
      if (response.status === 201) {
        setOpenSuccessModal(true);
      }
    } catch (err) {
      if (err.response.status === 409) {
        setIsUniqueEmail(false);
      } else if (err.response.status === 422) {
        console.log('Insufficient parameters')
      }
    }
  };
  // Validation check
  const isValidEmailFormat = (string) => {
    let format = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
    return format.test(string);
  };
  const isValidMobileFormat = (string) => {
    let format = new RegExp('^01([0|1|6|7|8|9])-([0-9]{4})-([0-9]{4})$');
    return format.test(string);
  };
  const isSamePassword = (originalPassword, doubleCheckPassword) => {
    return originalPassword === doubleCheckPassword;
  };
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isUniqueEmail, setIsUniqueEmail] = useState(true);
  const [isReady, setIsReady] = useState(true);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  useEffect(() => {
    if (
      isValidEmail &&
      isValidMobile &&
      isValidPassword &&
      name &&
      email &&
      password &&
      passwordCheck
    ) {
      setIsReady(false);
    }
  });

  return (
    <Container>
      <SignUpContainer>
        <SignUpHeader>REGISTRATION</SignUpHeader>
        <SignUpBox>
          <BoxLabel>Email</BoxLabel>
          <BoxInput>
            <Input type="text" placeholder="Enter Email" onChange={handleChangeEmail} required />
            {isValidEmail ? '' : <ErrorMessage>올바른 이메일 형식이 아닙니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>Name</BoxLabel>
          <BoxInput>
            <Input
              type="text"
              placeholder="이름을 8자 이내로 입력해주세요"
              onChange={handleChangeName}
              maxLength="8"
              required
            />
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>Password</BoxLabel>
          <BoxInput>
            <Input
              type="password"
              placeholder="Enter Password"
              onChange={handleChangePassword}
              required
            />
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>Password Check</BoxLabel>
          <BoxInput>
            <Input
              type="password"
              placeholder="Enter Email"
              onChange={handleChangePasswordCheck}
              className={isValidPassword ? '' : 'inValidInput'}
              required
            />
            {isValidPassword ? '' : <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>Mobile</BoxLabel>
          <BoxInput>
            {' '}
            <Input
              type="text"
              placeholder="010-0000-0000"
              onChange={handleChangeMobile}
              maxLength="13"
            />
            {isValidMobile ? '' : <ErrorMessage>올바른 전화번호 형식이 아닙니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>

        <ButtonBox>
          <Button onClick={() => handleSignupSubmit()} disabled={isReady}>
            {isReady ? '모든 항목을 입력해주세요' : 'Submit'}
          </Button>
          {isUniqueEmail ? '' : <div>이미 등록된 Email입니다.</div>}
          <p>
            Already have an account?
            <Link to="/signin">
              <Button>SIGN IN</Button>
            </Link>
          </p>
        </ButtonBox>
        {openSuccessModal ? <SignupModal handleSuccessModal={handleSuccessModal}/>: ''}
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;