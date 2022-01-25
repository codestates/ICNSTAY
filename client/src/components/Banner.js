import styled from 'styled-components';
import bannerImage from '../data/bannerImage.webp';

const ImageContainer = styled.div`
  padding: 4rem;
  position: relative;
  margin-left: 10rem;
  img {
    position: relative;
    /* border-radius: 1em; */
    z-index: 1;
    height: 40rem;
  }
`;

const ImageText = styled.div`
  position: absolute;
  background-color: black;
  /* border-radius: 1em; */
  width: 25rem;
  height: 30rem;
  z-index: 2;
  left: 4rem;
  color: white;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderText = styled.div`
  h1 {
    font-weight: 800;
    font-size: 32px;
    &:first-child {
      padding-bottom: 0.5em;
    }
  }
`;

const DescText = styled.div`
  padding-top: 1.5em;
  font-weight: 400;
  font-size: 16px;
  color: gray;
`;

const Banner = () => {
  return (
    <ImageContainer>
      <ImageText>
        <HeaderText>
          <h1>이제는 숙소를</h1>
          <h1>입찰하세요</h1>
        </HeaderText>
        <DescText>좋은 숙소를 합리적인 가격에 이용하실 수 있습니다</DescText>
      </ImageText>
      <img src={bannerImage}></img>
    </ImageContainer>
  );
};

export default Banner;
