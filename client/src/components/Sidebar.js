import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemContainer = styled.div`
  text-align: left;
`;
const ItemHeader = styled.div``;

const Item = styled.button`
  all: unset;
  width: 100%;
  /* text-align: center; */
  padding-bottom: 0.8em;
  margin-bottom: 0.8em;
  cursor: pointer;
  border: 1px solid #fff;
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
        <Item>BDIDING LIST</Item>
      </StyledLink>
    </ItemContainer>
  );
};

export default Sidebar;
