import testImage from '../../data/githubIcon.png';
import styled from 'styled-components';

const MainContainer = styled.div`
  text-align: center;
  img {
  width: 100px;  
  object-fit: cover;  
  }  
`;


const AcoommodationThumb = () => {
  return (
    <MainContainer>
      <img className='thumb' src={testImage}></img>
      <img className='thumb' src={testImage}></img>
      <img className='thumb' src={testImage}></img>
    </MainContainer>
  );
};

export default AcoommodationThumb;