import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Preloader from '../components/Preloader';

const BannerContainer = styled.div`
  height: 850px;
  @media ${({ theme }) => theme.device.mobile} {
    height: 600px;
  }
`;

const CardContainer = styled.div`
  padding: 5% 10%;
  @media ${({ theme }) => theme.device.mobile} {
    padding: 5%;
  }
`;

const CardBox = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
  @media ${({ theme }) => theme.device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
  @media ${({ theme }) => theme.device.mobile} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Home = ({ handleResponseSuccess, setUser }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accommodationList, setAccomodationList] = useState([]);

  useEffect(() => {
    async function getData() {
      const getAccommodationList = await axios.get(`${process.env.REACT_APP_API_URL}/accommodation`);
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
          const result = await axios.post(`${process.env.REACT_APP_API_URL}/oauth/signin`, {
            authorizationCode,
          });
          const kakaoAccessToken = result.data.access_token;
          console.log(result);
          const { id, email, social, username } = result.data.userFinder;
          handleResponseSuccess(kakaoAccessToken);
          setUser({ id, email, social, username });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
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
