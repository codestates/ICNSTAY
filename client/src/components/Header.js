import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../data/logo.png';
import { useEffect } from 'react';

const HeaderContainer = styled.header`
  height: 76px;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.grey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* z-index: 1; */
`;

const Logo = styled.div`
  background-image: url(${(props) => props.src});
  background-size: cover;
  text-align: center;
  width: 180px;
  height: 70px;
  cursor: pointer;
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  all: unset;
  height: 100%;
  margin-right: 1em;
  font-weight: 700;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  all: unset;
`;

const Header = ({ handleSignOut, isSignIn }) => {
  useEffect(() => {
    window.location.replace('/');
  }, [isSignIn]);
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <Logo src={logo} />
      </StyledLink>
      <ButtonContainer>
        {isSignIn ? (
          <>
            <StyledLink to="/userinfo">
              <Button>MY PAGE</Button>
            </StyledLink>
            <StyledLink to="/">
              <Button onClick={handleSignOut}>LOG OUT</Button>
            </StyledLink>
          </>
        ) : (
          <StyledLink to="/signin">
            <Button>LOG IN</Button>
          </StyledLink>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
