import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import sampleImg1 from '../data/logo.png'
import sampleImg2 from '../data/roomImgSample.jpg'
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
  //나중에 서버 'https://locahost:4000/accommodation'에서 데이터 가져오는 데에 성공하면 더미데이터 말고 서버측 데이터 사용할 예정

  useEffect(async () => {
    const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    console.log(getAccommodationList.data.accInfo);
    setAccomodationList(getAccommodationList.data.accInfo);
  }, [])
  // 랜딩페이지 구성하자마자 상기 url로 데이터 받아와서 클라이언트에 전달할 예정 

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
