import styled from 'styled-components';
import CalendarModule from '../CalendarModule';

const MainContainer = styled.div`
  padding: 1rem;
`;

const AccommodationDesc = () => {
  return (
    <MainContainer>
      <h1>Description Section</h1>
      <div>Name :</div>
      <div>Price :</div>
      <div>Minimum Bidding :</div>
      <div>
      <div>Date :</div>
      <CalendarModule />
      </div>
      <button>Place a bid</button>
    </MainContainer>
  );
};

export default AccommodationDesc;