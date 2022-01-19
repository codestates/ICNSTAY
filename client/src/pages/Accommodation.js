import { AccomodationImage, AccomodationInfo, AccomodationDesc } from '../components';
import styled from 'styled-components';

const AccomodationImage = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
  z-index:2;
`;

const AccomodationInfo = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
  z-index:2;
`;

const AccomodationDesc = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8rem;
  z-index:2;
`;

const Accommodation = () => {
  return (
    <section>
      <AccomodationImage></AccomodationImage>
      <AccomodationInfo></AccomodationInfo>
      <AccomodationDesc></AccomodationDesc>
    </section>
  );
};

export default Accommodation;