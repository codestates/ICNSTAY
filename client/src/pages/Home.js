import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Banner from '../components/Banner';
import { useDispatch } from 'react-redux';
import Card from '../components/Card';
import { setUser } from '../actions';
import Preloader from '../components/Preloader';

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

const Home = ({ handleResponseSuccess }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accommodationList, setAccomodationList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const getAccommodationList = await axios.get('https://localhost:4000/accommodation');
      setAccomodationList(getAccommodationList.data.accInfo);
      setIsLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getKakaoInfo() {
      const url = new URL(window.location.href);
      const authorizationCode = url.searchParams.get('code');
      try {
        if (authorizationCode === null) {
        } else {
          const result = await axios.post('https://localhost:4000/oauth/signin', {
            authorizationCode,
          });
          const kakaoAccessToken = result.data.access_token;
          console.log(result);
          const { id, email, social, username } = result.data.userFinder;
          handleResponseSuccess(kakaoAccessToken);
          dispatch(setUser({ id, email, social, username }));
        }
      } catch (e) {
        console.log(e);
      }
    }
    getKakaoInfo();
  }, [window.location.href]);

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
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
                  />
                );
              })}
            </CardBox>
          </CardContainer>
        </>
      )}
    </>
  );
};

export default Home;
