import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 1rem;
`;

const AccommodationInfo = ({ source }) => {
  return (
    <MainContainer>
      <h1>Information Section</h1>
        <div>{source.description}</div>
    </MainContainer>
  );
};

export default AccommodationInfo;