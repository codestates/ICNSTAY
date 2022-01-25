import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import AccommodationDesc from '../components/AccommoComponents/AccommodationDesc';
import AccommodationImage from '../components/AccommoComponents/AccommodationImage';
import AccommodationInfo from '../components/AccommoComponents/AccommodationInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setAccommodationDetail } from '../actions/index';
import Preloader from '../components/Preloader';

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding-top: 1.5em;
`;

const UpperContainer = styled.div`
  padding-bottom: 1.5em;
  border-bottom: 1px solid;
  padding-top: 2em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media ${({ theme }) => theme.device.tablet} {
    justify-content: center;
  }
`;

const UpperImg = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width: 300px;
  }
`;

const UpperDesc = styled.div`
  flex-shrink: 0;
  width: 300px;
  @media ${({ theme }) => theme.device.tablet} {
    margin-top: 1.5em;
  }
`;

const LowerContainer = styled.div`
  border-bottom: 1px solid;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
`;

const Accommodation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const accommodationState = useSelector((state) => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;
  const dispatch = useDispatch();

  useEffect(async () => {
    const response = await axios.get(`https://localhost:4000/accommodation/${id}`);
    setIsLoading(false);
    dispatch(setAccommodationDetail(response.data));
  }, []);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <MainContainer>
          <UpperContainer>
            <UpperImg>{accommodationDetail ? <AccommodationImage /> : null}</UpperImg>
            <UpperDesc>{accommodationDetail ? <AccommodationDesc /> : null}</UpperDesc>
          </UpperContainer>
          <LowerContainer>{accommodationDetail ? <AccommodationInfo /> : null}</LowerContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Accommodation;
