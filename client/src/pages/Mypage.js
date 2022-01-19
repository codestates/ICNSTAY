import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
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

const User = styled.div`
  width: 30%;
  height: 30%;
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
  return (
    <Container>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <UserContainer>
        <UserBox>
          <User>
            <Info>EMAIL : {user[0].email}</Info>
            <Info>USERNAME : {user[0].username}</Info>
            <Info>MOBILE : {user[0].mobile}</Info>
          </User>
        </UserBox>
      </UserContainer>
    </Container>
  );
};

export default Mypage;
