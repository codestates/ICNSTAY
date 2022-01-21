import styled from 'styled-components';
import CalendarModule from '../CalendarModule';
import { useState } from 'react';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';


const MainContainer = styled.div`
  padding: 1rem;
`;

const AccommodationDesc = ({source}) => {
  // Input data variances
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [biddingPrice, setBiddingPrice] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // Event handlers
  const openCalendarModule = () => {
    setOpenModal(!openModal);
  };
  const handleChangeBiddingPrice = (event) => {
    setBiddingPrice(event.target.value);
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
  }
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  }
  const handlePlacingBid = async () => {
    const bidInformation = {
      id: 1,
      userId: 1,
      username: 'tia',
      name: 'hotel deluna',
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      biddingPrice: biddingPrice,
      createdAt: '2022-01-19 15:33:47',
      updatedAt: '2022-01-19 15:33:47',
    };
    console.log(bidInformation)
  };

  return (
    <MainContainer>
      <h1>Description Section</h1>
      <div>Location : {source} </div>
      <div>Price : {source} </div>
      <div>Bidding ends at : {source}</div>
      <div>Minimum Price : {source}</div>
      <div>Highest Bidding : {source}</div>
      <div>
      <div>Bidding Price : {source}</div>
      <Input 
        type="number"
        placeholder="원"
        onChange={handleChangeBiddingPrice}
      />
      </div>
      <div><Button onClick={openCalendarModule}>{checkOutDate? `Check-in : ${checkInDate} Check-out : ${checkOutDate}`: 'Check-in/ Check-out'}</Button></div>
      {openModal ?
        <CalendarModule 
          handleCheckInDate={handleCheckInDate} 
          handleCheckOutDate={handleCheckOutDate} 
          checkInDate={checkInDate} 
          checkOutDate={checkOutDate}
          openCalendarModule={openCalendarModule}/>
        : ''
      }
      <Button onClick={() => handlePlacingBid()}>Place a bid</Button>
    </MainContainer>
  );
};

export default AccommodationDesc;