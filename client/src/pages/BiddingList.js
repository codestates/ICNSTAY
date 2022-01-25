import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import { Container } from '../styles/Container';
import { useSelector } from 'react-redux';

const SidebarContainer = styled.div`
  width: 15%;
`;

const ListContainer = styled.div`
  width: 85%;
  height: 100%;
`;

const ListBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled.div`
  text-align: center;
  width: 800px;
  font-size: 2em;
  font-weight: 800;
`;

const BiddingList = ({ user }) => {
  // const userState = useSelector(state => state.userReducer);
  // const { user } = userState;
  const { id, username } = user;
  const [list, setList] = useState([]);

  const getBiddingList = async () => {
    try {
      const response = await axios.get(`https://localhost:4000/biddinglist/${id}`);
      console.log(response.data);
      if (response.status === 200) {
        setList(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => getBiddingList(), []);

  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ListContainer>
        <ListBox>
          {list.length !== 0 ? (
            <>
              <Message>{username}님의 비딩 내역😃</Message>
              <List list={list} />
            </>
          ) : (
            <Message>{username}님의 비딩 내역이 없네요🥲</Message>
          )}
        </ListBox>
      </ListContainer>
    </Container>
  );
};

export default BiddingList;
