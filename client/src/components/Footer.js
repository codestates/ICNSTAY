import styled from 'styled-components';
import githubIcon from '../data/githubIcon.png';

const FooterContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10%;
`;

const Container = styled.footer`
  background-color: #f5f5f5;
  height: 76px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:first-child {
    padding-top: 5em;
  }
  &:last-child {
    padding-bottom: 5em;
  }
`;

const GithubIcon = styled.img.attrs({
  src: `${githubIcon}`,
})`
  width: 15px;
  height: 15px;
`;

const FooterHeader = styled.div`
  font-size: 0.9rem;
  padding: 0.5em 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <FooterHeader>K2H2</FooterHeader>
        <FooterHeader>
          Ho Min Kim{' '}
          <a href="http://github.com/Mubarmig">
            <GithubIcon src={githubIcon} />
          </a>{' '}
          Sean Kim{' '}
          <a href="https://github.com/seanswim">
            <GithubIcon src={githubIcon} />
          </a>{' '}
          Jin Hyeok Heo{' '}
          <a href="https://github.com/Jin-hyeok2">
            <GithubIcon src={githubIcon} />
          </a>{' '}
          Tia Hwang{' '}
          <a href="https://github.com/tiatiahwang">
            <GithubIcon src={githubIcon} />
          </a>
        </FooterHeader>
        <FooterHeader style={{ fontSize: '0.7rem' }}>Copyright 2022 @CodeStates</FooterHeader>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
