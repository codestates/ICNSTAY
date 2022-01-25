import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setVisitedPage } from '../actions/'
import { useSelector, useDispatch } from 'react-redux';

const CardImg = styled.img`
  src: ${(props) => props.src};
  width: 24rem;
  height: 15rem;
`;

const CardContainer = styled.div`
  padding: 1rem;
  text-align: center;
`;

const FILL_ME_IN = 'FILL_ME_IN';

const Card = ({ src, name, location, id }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardClick = async () => {
    navigate(`/accommodation/${id}`);
    try {
      const requestAccomodationInfo = await axios.get(`https://localhost:4000/accommodation/${id}`); // api가 완성되면 다시 작업할 예정!
      const redirectPath =  window.location.href.slice(22); // 여기서 지정한 상수를 스택 구조안 전역 state인 siteVisited에 넣어둘 예정!
      dispatch(setVisitedPage(redirectPath))
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <CardContainer>
      <CardImg src={src} onClick={handleCardClick} /> 
      <br/>
      {name || FILL_ME_IN}
      <br/>
      {location || FILL_ME_IN}
    </CardContainer>
  );
}

export default Card;
