import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import Banner from '../components/Banner';
import { useSelector, useDispatch } from 'react-redux';

const BannerContainer = styled.div`
  text-align: center;
  border: 1px solid white;
  background-color: #F3F4F6;
`;

const CardBox = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr)
`;

const Home = () => {
  const [accommodationList, setAccomodationList] = useState([]);
  const dispatch = useDispatch();

  // Get preload state from redux
  const preloadState = useSelector(state => state.preloadReducer);
  const { isLoading } = preloadState;

  useEffect(async () => {
    const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    setAccomodationList(getAccommodationList.data.accInfo);
  }, [])

  useEffect(async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode === null) {
      console.log("no authorizationCode");
    } else {
      console.log(authorizationCode)
      await axios.post('https://localhost:4000/oauth', { authorizationCode });
    }
  }, [window.location.href])

  return (
    <div>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <CardBox>
        {accommodationList.map((el, idx) => {
          return <Card 
            src={el.image[0]} 
            name={el.name} 
            location={el.location} 
            key= {idx} 
            id={el.id} 
            />
        })}
      </CardBox>
    </div>
    );
};

export default Home;
