import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import sampleImg1 from '../data/logo.png'
import sampleImg2 from '../data/roomImgSample.jpg'
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

const Home = ({ setVisitedPage }) => {
  const [accomodationList, setAccomodationList] = useState(dummyData);
  //나중에 서버 'https://locahost:4000/accommodation'에서 데이터 가져오는 데에 성공하면 더미데이터 말고 서버측 데이터 사용할 예정

  // useEffect(async () => {
    // const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    // setAccomodationList(getAccommodationList);
  // }, [])
  // 랜딩페이지 구성하자마자 상기 url로 데이터 받아와서 클라이언트에 전달할 예정 

  return (
    <div>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <CardBox>
        {accomodationList.map((el, idx) => {
          return <Card 
            src={sampleImg1} 
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
