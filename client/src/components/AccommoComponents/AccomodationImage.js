import styled from 'styled-components';
import testImage from '../../data/githubIcon.png';

const MainContainer = styled.div`
  padding: 2rem 10rem 2rem 0rem;
`;

const AccommodationImage = () => {
  return (
    <MainContainer>
      <img src={testImage}></img>
    </MainContainer>
  );
};

export default AccommodationImage;