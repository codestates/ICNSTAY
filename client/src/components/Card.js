import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setVisitedPage } from '../actions/'
import { useDispatch } from 'react-redux';

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

const Card = ({ src, name, location, id }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCardClick = () => {
    navigate(`/accommodation/${id}`);
    const redirectPath =  window.location.href.slice(22);
    dispatch(setVisitedPage(redirectPath))
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
