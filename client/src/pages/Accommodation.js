import styled from 'styled-components';
import AccommodationDesc from '../components/AccommoComponents/AccomodationDesc';
import AccommodationImage from '../components/AccommoComponents/AccomodationImage';
import AccommodationInfo from '../components/AccommoComponents/AccomodationInfo';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex: 1 0 0;
`;

const UpperContainer = styled.div`
  border-bottom: 1px solid;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 0.5rem;
  align-items: center;
`;

const LowerContainer = styled.div`
  border-bottom: 1px solid;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

const Accommodation = () => {
  return (
    <MainContainer>
      <UpperContainer>
        <AccommodationImage />
        <AccommodationDesc />
      </UpperContainer>
      <LowerContainer>
        <AccommodationInfo />
      </LowerContainer>
    </MainContainer>
  );
};

export default Accommodation;