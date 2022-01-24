import styled from 'styled-components';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const SidebarContainer = styled.div`
  width: 15%;
`;

const ListContainer = styled.div`
  width: 85%;
  height: 100%;
`;

const Message = styled.div`
  width: 800px;
  font-size: 20px;
  font-weight: 800;
`;

const BiddingList = ({ user }) => {
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
        {list.length !== 0 ? (
          <>
            <Message>{username}님의 비딩 내역😃</Message>
            <List list={list} />
          </>
        ) : (
          <Message>{username}님의 비딩 내역이 없네요🥲</Message>
        )}
      </ListContainer>
    </Container>
  );
};

export default BiddingList;
