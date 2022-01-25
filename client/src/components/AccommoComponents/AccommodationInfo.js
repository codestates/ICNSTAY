import styled from 'styled-components';

const InfoContainer = styled.div`
  padding: 1rem;
  /* text-align: center; */
`;

const Desc = styled.div`
  font-size: 1.5em;
`;

const AccommodationInfo = ({ source }) => {
  return (
    <InfoContainer>
      <Desc>{source.description}</Desc>
    </InfoContainer>
  );
};

export default AccommodationInfo;
