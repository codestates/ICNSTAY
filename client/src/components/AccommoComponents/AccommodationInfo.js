import styled from 'styled-components';
import { useSelector } from 'react-redux';

const InfoContainer = styled.div`
  padding: 1rem;
  /* text-align: center; */
`;

const Desc = styled.div`
  font-size: 1.5rem;
  margin-bottom: 100px;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1.2rem;
  }
  @media ${({ theme }) => theme.device.mobile} {
    font-size: 1rem;
  }
`;

const AccommodationInfo = () => {
  const accommodationState = useSelector((state) => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;

  return (
    <InfoContainer>
      <Desc>{accommodationDetail.information.description}</Desc>
    </InfoContainer>
  );
};

export default AccommodationInfo;
