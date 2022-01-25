import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { Modal } from '../components/Modal';
import { Button } from '../styles/Button';
import { Container, ErrorMessage, Header } from '../styles/Container';
import { Input } from '../styles/Input';

const MyPageContainer = styled.div`
  width: 60%;
`;

const WelcomeBox = styled.div`
  margin-top: 2em;
  font-size: 2rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const SidebarContainer = styled.div`
  width: 20%;
`;

const UserContainer = styled.div`
  width: 80%;
`;

const User = styled.div`
  width: 300px;
  font-size: 1.2rem;
  margin: 0 auto;
`;

const UserBox = styled.div`
  margin-bottom: 1em;
`;

const UserTitle = styled.div`
  font-weight: 700;
  margin-bottom: 2em;
  position: relative;
`;

const UserLabel = styled.div`
  margin-bottom: 1.5em;
  font-size: 0.9rem;
`;

const UserContent = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.grey};
  padding-bottom: 0.4em;
`;

const GoBackContainer = styled.div`
  cursor: pointer;
  font-size: 0.9rem;
  position: absolute;
  right: 0;
  bottom: 1px;
  color: ${(props) => props.theme.grey};
  &:hover {
    color: ${(props) => props.theme.black};
  }
`;

const UserInput = styled.div`
  position: relative;
`;

const Mypage = ({ user, setUser }) => {
  const navigate = useNavigate();
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
    <Container>
      <MyPageContainer>
        <Header style={{ marginBottom: '3em' }}>
          MY PAGE
          <WelcomeBox>{user.username}님 반가워요!</WelcomeBox>
        </Header>
        <ContentContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <UserContainer>
            {edit ? (
              <User>
                <UserTitle>
                  회원 정보 수정
                  <GoBackContainer onClick={goBack}>수정 취소</GoBackContainer>
                </UserTitle>
                <UserBox>
                  <UserLabel>이름</UserLabel>
                  <UserInput>
                    <Input
                      type="text"
                      placeholder={username}
                      maxLength="8"
                      onChange={handleChangeName}
                      style={{ marginTop: '0' }}
                    />
                  </UserInput>
                </UserBox>
                <UserBox>
                  <UserLabel>휴대전화</UserLabel>
                  <UserInput>
                    <Input
                      type="text"
                      placeholder={mobile}
                      onChange={handleChangeMobile}
                      maxLength="13"
                      className={isValidMobile ? '' : 'inValidInput'}
                      style={{ marginTop: '0' }}
                    />
                    {isValidMobile ? (
                      ''
                    ) : (
                      <ErrorMessage>올바른 전화번호 형식이 아닙니다</ErrorMessage>
                    )}
                  </UserInput>
                </UserBox>
                <UserBox>
                  <UserLabel>비밀번호</UserLabel>
                  <UserInput>
                    <Input
                      type="password"
                      placeholder="변경할 비밀번호"
                      onChange={handleChangePassword}
                      className={isValidPassword ? '' : 'inValidInput'}
                      style={{ marginTop: '0' }}
                    />
                  </UserInput>
                </UserBox>
                <UserBox>
                  <UserLabel>비밀번호 확인</UserLabel>
                  <UserInput>
                    <Input
                      type="password"
                      placeholder="변경할 비밀번호 확인"
                      onChange={handleChangePasswordCheck}
                      className={isValidPassword ? '' : 'inValidInput'}
                      style={{ marginTop: '0' }}
                    />
                    {isValidPassword ? (
                      ''
                    ) : (
                      <ErrorMessage>비밀번호가 일치하지 않습니다</ErrorMessage>
                    )}
                  </UserInput>
                </UserBox>
                <Button onClick={isReady ? handleModal : null} style={{ marginTop: '1.5em' }}>
                  회원 정보 수정
                </Button>
              </User>
            ) : (
              <User>
                <UserTitle>회원 정보</UserTitle>
                <UserBox>
                  <UserLabel>이메일</UserLabel>
                  <UserContent>{user.email}</UserContent>
                </UserBox>
                <UserBox>
                  <UserLabel>이름</UserLabel>
                  <UserContent>{user.username}</UserContent>
                </UserBox>
                <UserBox>
                  <UserLabel>휴대전화</UserLabel>
                  <UserContent>{user.mobile}</UserContent>
                </UserBox>
                <Button onClick={handleEdit}>회원 정보 수정</Button>
                <Button onClick={handleModal}>회원 탈퇴</Button>
              </User>
            )}
          </UserContainer>
        </ContentContainer>
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
      </MyPageContainer>
    </Container>
  );
};

export default Mypage;
