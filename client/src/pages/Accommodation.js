import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccommodationDesc from '../components/AccommoComponents/AccommodationDesc';
import AccommodationImage from '../components/AccommoComponents/AccommodationImage';
import AccommodationInfo from '../components/AccommoComponents/AccommodationInfo';

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
  // Get accommodation information from server
  const { id } = useParams();
  const [accommodationDetail, setAccommodationDetail] = useState();

  useEffect( async () => {
    const response = await axios.get(`https://localhost:4000/accommodation/${id}`);
    setAccommodationDetail(response.data);
  });

  return (
    <MainContainer>
      <UpperContainer>
        <AccommodationImage />
        <AccommodationDesc source={accommodationDetail}/>
      </UpperContainer>
      <LowerContainer>
        <AccommodationInfo source={accommodationDetail}/>
      </LowerContainer>
    </MainContainer>
  );
};

export default Accommodation;