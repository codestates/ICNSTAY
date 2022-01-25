import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemContainer = styled.div`
  text-align: left;
  @media ${({ theme }) => theme.device.tablet} {
    text-align: center;
    border-bottom: 2px solid ${(props) => props.theme.black};
    display: flex;
    justify-content: space-evenly;
  }
`;

const Item = styled.button`
  all: unset;
  width: 100%;
  padding-bottom: 0.8em;
  margin-bottom: 0.8em;
  cursor: pointer;
  border: 1px solid #fff;
  &:hover {
    border-bottom: 1px solid black;
    @media ${({ theme }) => theme.device.tablet} {
      border: none;
      font-weight: 700;
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    display: flex;
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
        <Item>BIDDING LIST</Item>
      </StyledLink>
    </ItemContainer>
  );
};

export default Sidebar;
