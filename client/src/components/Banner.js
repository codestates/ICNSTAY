import styled from 'styled-components';
import bannerImage from '../data/bannerImage.webp';

const ImageContainer = styled.div`
  text-align: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;
`;

const ImageText = styled.div`
  background-color: ${({ theme }) => theme.black};
  width: 400px;
  height: 450px;
  position: absolute;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media ${({ theme }) => theme.device.big} {
    bottom: 5em;
    left: 10em;
  }
  @media ${({ theme }) => theme.device.laptop} {
    width: 350px;
    height: 400px;
    bottom: 5em;
    left: 5em;
  }
  @media ${({ theme }) => theme.device.tablet} {
    width: auto;
    height: 170px;
    right: 2em;
    left: 2em;
    top: auto;
    bottom: 2em;
  }
`;

const HeaderText = styled.div`
  h1 {
    font-weight: 800;
    font-size: 2rem;
    &:first-child {
      padding-bottom: 0.5em;
    }
    @media ${({ theme }) => theme.device.mobile} {
      font-size: 1.5rem;
    }
  }
`;

const DescText = styled.div`
  padding-top: 1.5em;
  font-weight: 400;
  font-size: 1rem;
  color: ${({ theme }) => theme.grey};
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
  }
`;

const Banner = () => {
  return (
    <ImageContainer>
      <ImgBox src={bannerImage}></ImgBox>
      <ImageText>
        <HeaderText>
          <h1>이제는 숙소를</h1>
          <h1>입찰하세요</h1>
        </HeaderText>
        <DescText>좋은 숙소를 합리적인 가격에 이용하실 수 있습니다</DescText>
      </ImageText>
    </ImageContainer>
  );
};

export default Banner;
