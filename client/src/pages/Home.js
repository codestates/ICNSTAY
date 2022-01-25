import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Card from '../components/Card';

const BannerContainer = styled.div`
  text-align: center;
  /* border: 1px solid white; */
  background-color: #f3f4f6;
`;

const CardContainer = styled.div`
  padding: 5% 10%;
`;

const CardBox = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
`;

const Home = ({ setVisitedPage }) => {
  const [accommodationList, setAccomodationList] = useState([]);

  useEffect(async () => {
    const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
    setAccomodationList(getAccommodationList.data.accInfo);
  }, []);

  useEffect(async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode === null) {
      console.log('no authorizationCode');
    } else {
      console.log(authorizationCode);
      await axios.post('https://localhost:4000/oauth', { authorizationCode });
    }
  }, [window.location.href]);

  return (
    <div>
      <BannerContainer>
        <Banner />
      </BannerContainer>
      <CardContainer>
        <CardBox>
          {accommodationList.map((el, idx) => {
            return (
              <Card
                src={el.image[0]}
                name={el.name}
                location={el.location}
                key={idx}
                id={el.id}
                setVisitedPage={setVisitedPage}
              />
            );
          })}
        </CardBox>
      </CardContainer>
    </div>
  );
};

export default Home;
