import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';

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

const Home = ({ setVisitedPage }) => {
  const [accommodationList, setAccomodationList] = useState([]);

  useEffect(async () => {
    const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    setAccomodationList(getAccommodationList.data.accInfo);
  }, [])

  useEffect(async () => {
    // const REST_API_KEY = '8c7f2d24ac16c0f2a4d3dc987439ddbb'; //나중에 환경변수로 등록할 것! 
    // const redirect_uri = 'https://localhost:3000'
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode === null) {
      console.log("no authorizationCode");
    } else {
      console.log(authorizationCode)
      await axios.post('https://localhost:4000/callback', { authorizationCode });
    }
  }, [window.location.href])

  return (
    <div>
      <BannerContainer>
        <h1>
          SEE & STAY!
        </h1>
      </BannerContainer>
      <CardBox>
        {accommodationList.map((el, idx) => {
          return <Card 
            src={el.image[0]} 
            name={el.name} 
            location={el.location} 
            key= {idx} 
            id={el.id} 
            setVisitedPage={setVisitedPage}
            />
        })}
      </CardBox>
    </div>
    );
};

export default Home;
