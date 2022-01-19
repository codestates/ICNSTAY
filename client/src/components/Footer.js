import styled from 'styled-components';
import githubIcon from '../data/githubIcon.png';

const FooterContainer = styled.div`
  min-height: 90vh;
  width: 100%;
  position: relative;
  padding: 10 0px;
  z-index: 1;
`;

const Container = styled.footer`
  border-top: 1px solid black;
  height: 50px;
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 15px;
`;

const GithubIcon = styled.img.attrs({
  src: `${githubIcon}`,
})`
  width: 15px;
  height: 15px;
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <Container>
          <p>Team: K2H2</p>
          <span>
            Member: Ho Min Kim{' '}
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
          </span>
          <p>Copyright 2022 @CodeStates</p>
        </Container>
      </FooterContainer>{' '}
    </>
  );
};

export default Footer;
