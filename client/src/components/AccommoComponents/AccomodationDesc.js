import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
      <Calendar
        onChange=''
        value=''
      />
      </div>
      <button>Place a bid</button>
    </MainContainer>
  );
};

export default AccommodationDesc;