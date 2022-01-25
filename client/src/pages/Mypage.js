import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { Modal } from '../components/Modal';
import { Button } from '../styles/Button';
import { Container } from '../styles/Container';
import { Input } from '../styles/Input';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../actions';

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
  text-align: center;
`;

const IconContainer = styled.div`
  cursor: pointer;
  margin-bottom: 1em;
  font-weight: 500;
`;

// const Input = styled.input`
//   all: unset;
//   border: 1px solid black;
//   padding: 0.1em;
//   .inValidInput {
//     border: 1px solid red;
//   }
// `;

const User = styled.div`
  width: 450px;
  height: 450px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding: 1em;
  margin: 1em; */
`;

const EditBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoxLabel = styled.div`
  margin-left: 1em;
  width: 25%;
`;

const BoxInput = styled.div`
  /* margin-right: 1em; */
  width: 75%;
  position: relative;
`;

const Info = styled.div`
  padding: 0.8em;
`;

const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ff0000;
  position: absolute;
  bottom: -5px;
  left: 40px;
`;

const Mypage = ({ user, setUser }) => {
  // const userState = useSelector((state) => state.userReducer);
  // const { user } = userState;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [mobile, setMobile] = useState(user.mobile);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState();
  const [isReady, setIsReady] = useState(false);

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
      const response = await axios.put(`https://localhost:4000/userinfo/${user.id}`, {
        username,
        password: password === null ? password : sha256(password),
        mobile,
      });
      if (response.status === 200) {
        setEdit(false);
        setIsOpen(false);
        setUsername(username);
        setMobile(mobile);
        const userInfo = { id: user.id, email: user.email, username, mobile };
        setUser(userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`https://localhost:4000/userinfo/${user.id}`);
      if (response) {
        localStorage.clear();
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!password) {
      setIsReady(false);
      if (username || mobile) {
        setIsReady(true);
      }
    } else {
      setIsReady(false);
      if (passwordCheck && isValidPassword) {
        setIsReady(true);
      }
    }
  });

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
                  <EditBox>
                    <BoxLabel>Username</BoxLabel>
                    <BoxInput>
                      <Input
                        type="text"
                        placeholder={username}
                        maxLength="8"
                        onChange={handleChangeName}
                      />
                    </BoxInput>
                  </EditBox>
                  <EditBox>
                    <BoxLabel>Mobile</BoxLabel>
                    <BoxInput>
                      <Input
                        type="text"
                        placeholder={mobile}
                        onChange={handleChangeMobile}
                        maxLength="13"
                        className={isValidMobile ? '' : 'inValidInput'}
                      />
                    </BoxInput>
                  </EditBox>
                  <EditBox>
                    <BoxLabel>Password</BoxLabel>
                    <BoxInput>
                      <Input
                        type="password"
                        onChange={handleChangePassword}
                        className={isValidPassword ? '' : 'inValidInput'}
                      />
                    </BoxInput>
                  </EditBox>
                  <EditBox>
                    <BoxLabel>Password Check</BoxLabel>
                    <BoxInput>
                      <Input
                        type="password"
                        onChange={handleChangePasswordCheck}
                        className={isValidPassword ? '' : 'inValidInput'}
                      />
                      {isValidPassword ? (
                        ''
                      ) : (
                        <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
                      )}
                    </BoxInput>
                  </EditBox>

                  <Button onClick={isReady ? handleModal : null} style={{ marginTop: '1.5em' }}>
                    Edit My Info
                  </Button>
                </User>
              </>
            ) : (
              <User>
                <Info>EMAIL : {user.email}</Info>
                <Info>USERNAME : {user.username}</Info>
                <Info>MOBILE : {user.mobile}</Info>
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
