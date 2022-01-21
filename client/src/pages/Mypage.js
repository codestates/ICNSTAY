import { useState } from 'react';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import pencilIcon from '../data/pencil.png';

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

const Mypage = ({ userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('Edit');
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [password, setPassword] = useState(null);
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

  const handleChangeName = (e) => {
    setUsername(e.target.value);
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
  const isValidMobileFormat = (string) => {
    let format = new RegExp('^01([0|1|6|7|8|9])-([0-9]{4})-([0-9]{4})$');
    return format.test(string);
  };

  const isSamePassword = (originalPassword, doubleCheckPassword) => {
    return originalPassword === doubleCheckPassword;
  };

  const [isValidMobile, setIsValidMobile] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`https://localhost:4000/userinfo/${userInfo.id}`, {
        username,
        password: password === null ? password : sha256(password),
        mobile,
      });
      if (response.status === 200) {
        setEdit(false);
        setText('Edit');
        setIsOpen(false);
        setUsername(username);
        setMobile(mobile);
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
                    USERNAME :{' '}
                    <Input
                      type="text"
                      placeholder={username}
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
                </>
              ) : (
                <>
                  <Info>EMAIL : {userInfo.email}</Info>
                  <Info>USERNAME : {username}</Info>
                  <Info>MOBILE : {mobile}</Info>
                </>
              )}
            </User>
          </UserBox>
        </UserContainer>
      </Container>
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={'이대로 수정 하시겠습니까?'}
          handleYesButton={handleSubmit}
        />
      ) : null}
    </>
  );
};

export default Mypage;
