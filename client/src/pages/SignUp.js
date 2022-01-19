import { sha256 } from 'js-sha256';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
  z-index: 2;
  .inValidInput {
    border-color: red;
  }
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
  const handleSignupSubmit = async () => {
    const userInformation = {
      email: email,
      name: name,
      password: sha256(password),
      mobile: mobile,
    };
    try {
      const response = await axios.post('/signup', { userInformation });
      if (response.message === 'sign-up ok') {
        history.push('/signin');
      } else if (response.message === 'email exist') {
        setIsValidName(false);
      } else if (response.message === 'name exist') {
        setIsValidName(false);
      }
    } catch (err) {
      console.log(err);
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
  const [isValidName, setIsValidName] = useState(true);
  const [isUniqueEmail, setIsUniqueEmail] = useState(true);
  const [isReady, setIsReady] = useState(true);

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
    <SignUpContainer>
      <section>
        <h1>Registration</h1>
      </section>
      <section>Email*</section>
      <input
        type="text"
        placeholder="Enter Email"
        onChange={handleChangeEmail}
        className={isValidEmail ? '' : 'inValidInput'}
        required
      />
      {isValidEmail ? '' : <div>올바른 이메일 형식이 아닙니다</div>}
      <section>Name*</section>
      <input
        type="text"
        placeholder="이름을 8자 이내로 입력해주세요"
        onChange={handleChangeName}
        maxLength="8"
        required
      />
      <section>Password*</section>
      <input
        type="password"
        placeholder="Enter Password"
        onChange={handleChangePassword}
        className={isValidPassword ? '' : 'inValidInput'}
        required
      />
      <section>Password Check*</section>
      <input
        type="password"
        placeholder="Enter Email"
        onChange={handleChangePasswordCheck}
        className={isValidPassword ? '' : 'inValidInput'}
        required
      />
      {isValidPassword ? '' : <div>비밀번호가 일치하지 않습니다</div>}
      <section>Mobile</section>
      <input
        type="text"
        placeholder="010-0000-0000"
        onChange={handleChangeMobile}
        maxLength="13"
        className={isValidMobile ? '' : 'inValidInput'}
      />
      {isValidMobile ? '' : <div>올바른 전화번호 형식이 아닙니다</div>}
      <p>
        <button onClick={() => handleSignupSubmit()} disabled={isReady}>
          Submit
        </button>
      </p>
      {isValidName ? '' : <div>다른 사용자가 이용중인 이름입니다.</div>}
      {isUniqueEmail ? '' : <div>이미 등록된 Email입니다.</div>}
      <p>
        Already have an account? <a href="/">Sign in</a>.
      </p>
    </SignUpContainer>
  );
};

export default SignUp;
