import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Item = styled.button`
  all: unset;
  width: 100%;
  text-align: center;
  padding-bottom: 0.8em;
  margin-bottom: 0.8em;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

const StyledLink = styled(Link)`
  all: unset;
`;

const Sidebar = () => {
  return (
    <ItemContainer>
      <StyledLink to="/userinfo">
        <Item>MY PAGE</Item>
      </StyledLink>
      <StyledLink to="/biddinglist">
<<<<<<< HEAD
        <Item>BOOKING LIST</Item>
=======
        <Item>BDIDING LIST</Item>
>>>>>>> 7f4a1a99de00dcdc9296fab0dd2d5729b9674389
      </StyledLink>
    </ItemContainer>
  );
};

export default Sidebar;
