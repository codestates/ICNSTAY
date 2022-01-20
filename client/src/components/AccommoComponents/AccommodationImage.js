import styled from 'styled-components';
import testImage from '../../data/githubIcon.png';
import AccommodationThumb from './AccommodationThumb';


const MainContainer = styled.div`
  padding: 2rem 10rem 2rem 0rem;
`;

const AccommodationImage = () => {
  return (
    <MainContainer>
      <img src={testImage}></img>
      <AccommodationThumb />
    </MainContainer>
  );
};

export default AccommodationImage;