import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import { SignupModal } from '../components/Modal';
import { Container, ErrorMessage, Header } from '../styles/Container';
import { Input } from '../styles/Input';
import { Button } from '../styles/Button';

const SignUpContainer = styled.div`
  width: 350px;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
  }
`;

const SignUpBox = styled.div`
  padding: 0.4em 0;
`;

const BoxLabel = styled.div`
  font-size: 0.8rem;
`;

const BoxInput = styled.div`
  position: relative;
`;

const ButtonBox = styled.div`
  margin-top: 0.4em;
`;

const ButtonText = styled.div`
  text-align: center;
  font-size: 0.8rem;
  margin: 0.4em 0;
`;

const SignUp = () => {
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [mobile, setMobile] = useState();

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
  };
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
        console.log('Insufficient parameters');
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
        <Header>JOIN</Header>
        <SignUpBox>
          <BoxLabel>이메일</BoxLabel>
          <BoxInput>
            <Input
              type="text"
              placeholder="이메일을 입력해 주세요"
              onChange={handleChangeEmail}
              required
            />
            {isValidEmail ? '' : <ErrorMessage>올바른 이메일 형식이 아닙니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>이름</BoxLabel>
          <BoxInput>
            <Input
              type="text"
              placeholder="8자 이내로 입력해 주세요"
              onChange={handleChangeName}
              maxLength="8"
              required
            />
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>비밀번호</BoxLabel>
          <BoxInput>
            <Input
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={handleChangePassword}
              required
            />
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>비밀번호 확인</BoxLabel>
          <BoxInput>
            <Input
              type="password"
              placeholder="비밀번호를 확인해 주세요"
              onChange={handleChangePasswordCheck}
              className={isValidPassword ? '' : 'inValidInput'}
              required
            />
            {isValidPassword ? '' : <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>
        <SignUpBox>
          <BoxLabel>휴대전화</BoxLabel>
          <BoxInput>
            <Input
              type="text"
              placeholder="010-0000-0000 형식으로 입력해 주세요"
              onChange={handleChangeMobile}
              maxLength="13"
            />
            {isValidMobile ? '' : <ErrorMessage>올바른 전화번호 형식이 아닙니다</ErrorMessage>}
          </BoxInput>
        </SignUpBox>
        <ButtonBox>
          <Button onClick={() => handleSignupSubmit()} disabled={isReady}>
            {isReady ? '모든 항목을 입력해주세요' : '회원가입'}
          </Button>
          {isUniqueEmail ? '' : <div>이미 등록된 Email입니다.</div>}
          <ButtonText>이미 계정이 있으신가요?</ButtonText>
          <Link to="/signin">
            <Button>로 그 인</Button>
          </Link>
        </ButtonBox>
        {openSuccessModal ? <SignupModal handleSuccessModal={handleSuccessModal} /> : ''}
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
