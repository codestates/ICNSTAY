import styled from 'styled-components';
import { AccommodationImage, AccomodationInfo, AccommodationDesc } from '../components'


const Accommodation = () => {
  return (
    <MainContainer>
      <AccommodationImage></AccommodationImage>
      <AccomodationInfo></AccomodationInfo>
      <AccommodationDesc></AccommodationDesc>
    </MainContainer>
  );
};

export default Accommodation;