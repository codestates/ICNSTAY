import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

const Card = ({src, name, location, id}) => {
  const navigate = useNavigate();
  const handleCardClick = async () => {
    navigate('/signin') // 우선 임시로 로그인한 페이지로 가게끔 설정, 숙소 상세 페이지 path가 지정되면 거기로 수정할 예정;
    const requestAccomodationInfo = await axios.get(`/${id}`);
    console.log(requestAccomodationInfo)
  };

  return (
    <CardContainer>
      <CardImg src={src} onClick={handleCardClick} /> 
      <br/>
      name: {name || FILL_ME_IN}
      <br/>
      location: {location || FILL_ME_IN}
    </CardContainer>
  );
}
export default Card;
