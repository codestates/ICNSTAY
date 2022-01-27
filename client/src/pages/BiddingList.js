import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import { Container, Header } from '../styles/Container';
import Preloader from '../components/Preloader';

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

const ListContainer = styled.div`
  margin-left: 3em;
  @media ${({ theme }) => theme.device.tablet} {
    margin-left: 0;
  }
`;

const ListBox = styled.div`
  margin: 0 auto;
  @media ${({ theme }) => theme.device.tablet} {
    margin: 0;
  }
`;

const ListTitle = styled.div`
  font-weight: 700;
  margin-bottom: 2em;
  font-size: 1.2rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1rem;
    margin-top: 1em;
  }
`;

const BiddingList = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id, username } = user;
  const [list, setList] = useState([]);

  const getBiddingList = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/biddinglist/${id}`);
      setIsLoading(false);
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getBiddingList(), []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <Container>
          <MyPageContainer>
            <Header>
              MY PAGE
              <WelcomeBox>{username}님 반가워요!</WelcomeBox>
            </Header>
            <ContentContainer>
              <SidebarContainer>
                <Sidebar />
              </SidebarContainer>
              <ListContainer>
                <ListBox>
                  {list.length !== 0 ? (
                    <>
                      <ListTitle>{username}님의 비딩 내역</ListTitle>
                      <List list={list} />
                    </>
                  ) : (
                    <ListTitle>{username}비딩 내역이 없습니다</ListTitle>
                  )}
                </ListBox>
              </ListContainer>
            </ContentContainer>
          </MyPageContainer>
        </Container>
      )}
    </>
  );
};

export default BiddingList;
