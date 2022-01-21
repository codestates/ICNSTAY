import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import { Button } from '../styles/Button';

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

const Input = styled.input`
  all: unset;
  border: 1px solid black;
  padding: 0.1em;

  .inValidInput {
    border: 1px solid red;
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

const Mypage = ({ setIsLogIn, userInfo }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [mobile, setMobile] = useState(userInfo.mobile);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState();

  const goBack = () => setEdit(false);

  const handleEdit = () => setEdit(!edit);

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

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`https://localhost:4000/userinfo/${userInfo.id}`, {
        username,
        password: password === null ? password : sha256(password),
        mobile,
      });
      if (response.status === 200) {
        setEdit(false);
        setIsOpen(false);
        setUsername(username);
        setMobile(mobile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`https://localhost:4000/userinfo/${userInfo.id}`);
      if (response) {
        setIsLogIn(false);
        navigate('/');
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
            {edit ? (
              <>
                <IconContainer onClick={goBack}> 뒤로가기 </IconContainer>
                <User>
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
                </User>
              </>
            ) : (
              <User>
                <Info>EMAIL : {userInfo.email}</Info>
                <Info>USERNAME : {username}</Info>
                <Info>MOBILE : {mobile}</Info>
                <Button onClick={handleEdit}>Edit My Info</Button>
                <Button onClick={handleModal}>Delete My Account</Button>
              </User>
            )}
          </UserBox>
        </UserContainer>
      </Container>
      {isOpen & edit ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={'이대로 수정 하시겠습니까?'}
          handleYesButton={handleEditSubmit}
        />
      ) : null}
      {isOpen && !edit ? (
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          text={'정말 탈퇴하시겠습니까?'}
          handleYesButton={handleDeleteSubmit}
        />
      ) : null}
    </>
  );
};

export default Mypage;
