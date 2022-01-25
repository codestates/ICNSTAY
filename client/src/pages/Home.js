import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import axios from 'axios';
import Banner from '../components/Banner';

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

const Home = ({ setVisitedPage, setUser, handleResponseSuccess }) => {
  const [accommodationList, setAccomodationList] = useState([]);

  useEffect(() => {
    async function getData () {
    const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    setAccomodationList(getAccommodationList.data.accInfo);
    };
    getData();
  }, []) 

  useEffect(() => {
    async function getKakaoInfo() {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get('code');
      if (authorizationCode === null) {
        console.log("no authorizationCode");
      } else {
        const result = await axios.post('https://localhost:4000/oauth/signin', { authorizationCode });
        // console.log("액세스 토큰:", result.data.access_token)
        const accessToken = { kakaoAccessToken: result.data.access_token };
        const { id, email, username } = result.data.userFinder;
        handleResponseSuccess(accessToken);
        setUser({ id, email, username });
      }
    };
    getKakaoInfo();
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
            setVisitedPage={setVisitedPage}
            />
        })}
      </CardBox>
    </div>
    );
};

export default Home;
