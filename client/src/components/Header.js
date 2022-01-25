import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../data/logo.png';
import { useEffect, useState } from 'react';

const HeaderContainer = styled.header`
  height: 50px;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;

const Logo = styled.img`
  src: ${(props) => props.src};
  width: 125px;
  height: 100%;
  cursor: pointer;
`;

const ButtonContainer = styled.div``;

const Button = styled.button`
  all: unset;
  height: 100%;
  padding: 0 10px;
  margin-right: 10px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  all: unset;
`;

const Header = ({ handleSignOut }) => {
  const [isLogIn, setIsLogIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isSignIn')) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  });
  return (
    <HeaderContainer>
      <StyledLink to="/">
        <Logo src={logo} />
      </StyledLink>
      <ButtonContainer>
        {isLogIn ? (
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
