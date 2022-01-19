import { useState } from 'react';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import pencilIcon from '../data/pencil.png';
import dummyUsers from '../data/dummyUsers';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 15%;
`;

const UserContainer = styled.div`
  width: 85%;
  height: 100%;
`;

const UserBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconContainer = styled.div`
  /* width: 38%;
  align-self: flex-end; */
  cursor: pointer;
`;

const Icon = styled.img`
  src: ${(props) => props.src};
  width: 20px;
  height: 20px;
`;

const Input = styled.input`
  all: unset;
  border: 1px solid black;
  padding: 0.1em;

  &.inValidInput {
    border: 1px solid red;
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  padding: 0.8em;
  border: 1px solid black;
  width: 80%;
  text-align: center;
  &:hover {
    background: black;
    color: white;
    transition: 0.7s;
  }
`;

const User = styled.div`
  width: 500px;
  height: 500px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.span`
  padding: 0.8em;
`;

// 우선 더미데이터 이용. 추후 데이터 베이스에서 해당 user 조회 기능으로 수정할 예정
// 임의로 user의 id를 1로 해서 해당 유저 정보 조회
const user = dummyUsers.filter((el) => el.id === 1);

const Mypage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('Edit');
  const [edit, setEdit] = useState(false);
  const [email, setEmail] = useState(user[0].email);
  const [name, setName] = useState(user[0].username);
  const [mobile, setMobile] = useState(user[0].mobile);
  const [password, setPassword] = useState(user[0].password);
  const [passwordCheck, setPasswordCheck] = useState();

  const handleEdit = () => {
    if (edit) {
      setEdit(false);
      setText('Edit');
    } else {
      setEdit(true);
      setText('에딧 취소');
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    isValidEmailFormat(e.target.value) ? setIsValidEmail(true) : setIsValidEmail(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeMobile = (e) => {
    setMobile(e.target.value);
    isValidMobileFormat(e.target.value) ? setIsValidMobile(true) : setIsValidMobile(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
    isSamePassword(password, e.target.value) ? setIsValidPassword(true) : setIsValidPassword(false);
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

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSignupSubmit = async () => {
    const userInformation = {
      email,
      name,
      password: password === null ? null : sha256(password),
      mobile,
    };
    console.log(userInformation);
    try {
      const response = await axios.put(`/userinfo/${user.id}`, {
        userInformation,
      });
      if (response.status === 200) {
        setEdit(false);
        setText('Edit');
        setIsOpen(false);
        setEmail(userInformation.email);
        setName(userInformation.name);
        setMobile(userInformation.mobile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
        <UserContainer>
          <UserBox>
            <IconContainer onClick={handleEdit}>
              {text} <Icon src={pencilIcon} />
            </IconContainer>
            <User>
              {edit ? (
                <>
                  <Info>
                    Email :{' '}
                    <Input
                      type="text"
                      placeholder={email}
                      onChange={handleChangeEmail}
                      className={isValidEmail ? '' : 'inValidInput'}
                    />
                    {isValidEmail ? '' : <div>올바른 이메일 형식이 아닙니다</div>}
                  </Info>
                  <Info>
                    USERNAME :{' '}
                    <Input
                      type="text"
                      placeholder={name}
                      maxLength="8"
                      onChange={handleChangeName}
                    />
                  </Info>
                  <Info>
                    MOBILE :{' '}
                    <Input
                      type="text"
                      placeholder={mobile}
                      onChange={handleChangeMobile}
                      maxLength="13"
                      className={isValidMobile ? '' : 'inValidInput'}
                    />
                  </Info>
                  <Info>
                    PASSWORD :{' '}
                    <Input
                      type="password"
                      onChange={handleChangePassword}
                      className={isValidPassword ? '' : 'inValidInput'}
                    />
                  </Info>
                  <Info>
                    PASSWORD CHECK :{' '}
                    <Input
                      type="password"
                      onChange={handleChangePasswordCheck}
                      className={isValidPassword ? '' : 'inValidInput'}
                    />
                    {isValidPassword ? '' : <div>비밀번호가 일치하지 않습니다</div>}
                  </Info>
                  <Button onClick={handleModal}>Edit My Info</Button>
                  {isValidName ? '' : <div>다른 사용자가 이용중인 이름입니다.</div>}
                  {isUniqueEmail ? '' : <div>이미 등록된 Email입니다.</div>}
                </>
              ) : (
                <>
                  <Info>EMAIL : {email}</Info>
                  <Info>USERNAME : {name}</Info>
                  <Info>MOBILE : {mobile}</Info>
                </>
              )}
            </User>
          </UserBox>
        </UserContainer>
      </Container>
      {/* {isOpen ? (
        <ModalBackground>
          <ModalContainer>
            <ModalContent>입력하신 정보로 수정하시겠습니까?</ModalContent>
            <ModalButton type={'YES'} onClick={handleSignupSubmit}>
              YES
            </ModalButton>
            <ModalButton onClick={handleModal}>NO</ModalButton>
          </ModalContainer>
        </ModalBackground>
      ) : null} */}
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={'이대로 수정 하시겠습니까?'}
          handleYesButton={handleSignupSubmit}
        />
      ) : null}
    </>
  );
};

export default Mypage;
