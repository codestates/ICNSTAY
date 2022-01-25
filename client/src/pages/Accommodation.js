import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import AccommodationDesc from '../components/AccommoComponents/AccommodationDesc';
import AccommodationImage from '../components/AccommoComponents/AccommodationImage';
import AccommodationInfo from '../components/AccommoComponents/AccommodationInfo';
import { useSelector, useDispatch } from 'react-redux';
import { setAccommodationDetail, setIsLoading } from '../actions/index';

const MainContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const UpperContainer = styled.div`
  border-bottom: 1px solid;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
  align-items: center;
  > .desc {
    flex-shrink: 0;
    width: 300px;
  }
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
  // Get accommodation state information from redux
  const accommodationState = useSelector(state => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;
  const dispatch = useDispatch();

  useEffect( async () => {
    const response = await axios.get(`https://localhost:4000/accommodation/${id}`);
    dispatch(setAccommodationDetail(response.data));
    dispatch(setIsLoading(false));
  },[]);

  return (
    <MainContainer>
      <UpperContainer>
        <span className='image'>{accommodationDetail ? <AccommodationImage /> : null}</span>
        <span className='desc'>{accommodationDetail ? <AccommodationDesc /> : null}</span>
      </UpperContainer>
      <LowerContainer>
        {accommodationDetail ? <AccommodationInfo /> : null}
      </LowerContainer>
    </MainContainer>
  );
};

export default Accommodation;