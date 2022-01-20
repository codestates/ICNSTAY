import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import List from '../components/List';
import dummyBid from '../data/dummyBid';

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

// TODO: 더미데이터 사용 후 추후 수정
const bids = dummyBid.filter((el) => el.username === 'tia');

const BiddingList = () => {
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ListContainer>
        {bids.length !== 0 ? (
          <>
            <Message>{bids[0].username}님의 비딩 내역😃</Message>
            <List list={bids} />
          </>
        ) : (
          // TODO: 로그인한 유저 이름 추가 -> ex) tia님의 비딩 내역이 없습니다
          <Message>비딩 내역이 없네요🥲</Message>
        )}
      </ListContainer>
    </Container>
  );
};

export default BiddingList;
