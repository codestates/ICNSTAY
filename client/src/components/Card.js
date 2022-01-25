import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CardContainer = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 1.5em;
  cursor: pointer;
  border: 1px solid #fff;
  &:hover {
    border-bottom: 1px solid #000;
  }
`;
// const CardImg = styled.img`
//   src: ${(props) => props.src};
//   /* width: 24rem;
//   height: 15rem; */
// `;

const CardImg = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;
  /* border-radius: 1em; */
`;

const CardInfo = styled.div`
  margin-top: 1.2em;
`;

const CardName = styled.div`
  font-size: 1em;
`;

const CardLocation = styled.div`
  margin-top: 0.6em;
  font-size: 0.6em;
`;

const FILL_ME_IN = 'FILL_ME_IN';

const Card = ({ src, name, location, id, setVisitedPage }) => {
  const navigate = useNavigate();

  const handleCardClick = async () => {
    navigate(`/accommodation/${id}`);
    try {
      const requestAccomodationInfo = await axios.get(`https://localhost:4000/accommodation/${id}`); // api가 완성되면 다시 작업할 예정!
      const redirectPath = window.location.href.slice(22); // 여기서 지정한 상수를 스택 구조안 전역 state인 siteVisited에 넣어둘 예정!
      setVisitedPage(redirectPath); // 최근 방문한 사이트 저장
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CardContainer onClick={handleCardClick}>
      <CardImg src={src} />
      <CardInfo>
        <CardName>{name}</CardName>
        <CardLocation>{location}</CardLocation>
      </CardInfo>
    </CardContainer>
  );
};

export default Card;
