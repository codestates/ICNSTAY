import { useEffect, useState } from 'react';
import { sha256 } from 'js-sha256';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import { Modal } from '../components/Modal';
import { Button } from '../styles/Button';
import { Container, ErrorMessage, Header } from '../styles/Container';
import { Input } from '../styles/Input';
import { useNavigate } from 'react-router-dom';

const MyPageContainer = styled.div`
  width: 60%;
`;

const WelcomeBox = styled.div`
  margin-top: 2em;
  font-size: 2rem;
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3em;
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    margin-top: 1em;
  }
`;

const SidebarContainer = styled.div`
  width: 20%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const UserContainer = styled.div`
  width: 80%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const User = styled.div`
  width: 300px;
  font-size: 1.2rem;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    width: auto;
    margin-top: 3em;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
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
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
  }
`;

const UserInput = styled.div`
  position: relative;
`;

const Mypage = ({ user, setUser, setIsSignIn }) => {
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
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/userinfo/${user.id}`, {
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
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/userinfo/${user.id}`);
      if (response) {
        setIsSignIn(false);
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
        <Header>
          MY PAGE
          <WelcomeBox>{user.username}??? ????????????!</WelcomeBox>
        </Header>
        <ContentContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <UserContainer>
            {edit ? (
              <User>
                <UserTitle>
                  ?????? ?????? ??????
                  <GoBackContainer onClick={goBack}>?????? ??????</GoBackContainer>
                </UserTitle>
                <UserBox>
                  <UserLabel>??????</UserLabel>
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
                  <UserLabel>????????????</UserLabel>
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
                      <ErrorMessage>????????? ???????????? ????????? ????????????</ErrorMessage>
                    )}
                  </UserInput>
                </UserBox>
                <UserBox>
                  <UserLabel>????????????</UserLabel>
                  <UserInput>
                    <Input
                      type="password"
                      placeholder="????????? ????????????"
                      onChange={handleChangePassword}
                      className={isValidPassword ? '' : 'inValidInput'}
                      style={{ marginTop: '0' }}
                    />
                  </UserInput>
                </UserBox>
                <UserBox>
                  <UserLabel>???????????? ??????</UserLabel>
                  <UserInput>
                    <Input
                      type="password"
                      placeholder="????????? ???????????? ??????"
                      onChange={handleChangePasswordCheck}
                      className={isValidPassword ? '' : 'inValidInput'}
                      style={{ marginTop: '0' }}
                    />
                    {isValidPassword ? (
                      ''
                    ) : (
                      <ErrorMessage>??????????????? ???????????? ????????????</ErrorMessage>
                    )}
                  </UserInput>
                </UserBox>
                <Button onClick={isReady ? handleModal : null} style={{ marginTop: '1.5em' }}>
                  ?????? ?????? ??????
                </Button>
              </User>
            ) : (
              <User>
                <UserTitle>?????? ??????</UserTitle>
                <UserBox>
                  <UserLabel>?????????</UserLabel>
                  <UserContent>{user.email}</UserContent>
                </UserBox>
                <UserBox>
                  <UserLabel>??????</UserLabel>
                  <UserContent>{user.username}</UserContent>
                </UserBox>
                <UserBox>
                  <UserLabel>????????????</UserLabel>
                  <UserContent>{user.mobile}</UserContent>
                </UserBox>
                <Button onClick={handleEdit}>?????? ?????? ??????</Button>
                <Button onClick={handleModal}>?????? ??????</Button>
              </User>
            )}
          </UserContainer>
        </ContentContainer>
        {isOpen & edit ? (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={'????????? ?????? ???????????????????'}
            handleYesButton={handleEditSubmit}
          />
        ) : null}
        {isOpen && !edit ? (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={'?????? ?????????????????????????'}
            handleYesButton={handleDeleteSubmit}
          />
        ) : null}
      </MyPageContainer>
    </Container>
  );
};

export default Mypage;
