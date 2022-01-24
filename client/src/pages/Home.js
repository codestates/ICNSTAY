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

const dummyData = // 아직 서버랑 합치지 않았으므로 클라이언트에서 렌더링이 제대로 되는지 확인하기 위해 더미데이터를 작성했다.
  [
    {
      id: 1,
      name: 'The Plaza',
      location: 'New York',
      description: 'it is falbulous',
      minPrice: '30000원'
    },
    {
      id: 2,
      name: 'Hotel Ritz',
      location: 'Paris',
      description: 'it is falbulous',
      minPrice: '50000원'
    },
    {
      id: 3,
      name: "Claridge's",
      location: 'London',
      description: 'it is falbulous',
      minPrice: '40000원'
    },
    {
      id: 4,
      name: 'Raffles',
      location: 'Singapore',
      description: 'it is falbulous',
      minPrice: 'for free'
    },
    {
      id: 5,
      name: 'Taj Mahal Palace',
      location: 'India',
      description: 'it is falbulous',
      minPrice: 'for free'
    },
    {
      id: 6,
      name: 'Beverly Hills Hotel',
      location: 'LA',
      description: 'it is falbulous',
      minPrice: 'for free'
    },
    {
      id: 7,
      name: 'Peninsula Hong Kong',
      location: 'Hong Kong',
      description: 'it is falbulous',
      minPrice: 'for free'
    },
    {
      id: 8,
      name: 'Waldorf Astoria',
      location: 'New York',
      description: 'it is falbulous',
      minPrice: 'for free'
    },
    {
      id: 9,
      name: 'The Shelbourne Hotel',
      location: 'Dublin',
      description: 'it is falbulous',
      minPrice: 'for free'
    }
  ]

const Home = () => {
  const [accomodationList, setAccomodationList] = useState(dummyData);

  // 랜딩페이지에 접속하자마자 서버로부터 바로 숙소리스트 데이터를 받아오게끔 만든다. 
  // useEffect(() => {
  //   axios.get('/')
  //   .then(res => {
  //     console.log(res.data);
  //     setAccomodationList(res.data)
  //   }); 
  // }, [])

  return (
    <div>
      <BannerContainer>
        <h1>
          SEE & STAY!
        </h1>
      </BannerContainer>
      <CardBox>
        {accomodationList.map((el, idx) => {
          return <Card src={sampleImg1} name={el.name} location={el.location} key= {idx} id={el.id} />
        })}
      </CardBox>
    </div>
    );
};

export default Home;
