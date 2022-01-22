import styled from 'styled-components';
import CalendarModule from '../CalendarModule';
import { useState, useEffect } from 'react';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MainContainer = styled.div`
  padding: 1rem;
  > .desc {
    margin-bottom: 4rem;
  }
`;

const AccommodationDesc = ({ source }) => {
  // Setup variances
  const history = useNavigate();
  // Input data variances
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [biddingPrice, setBiddingPrice] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isReady, setIsReady] = useState(true);
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
      id: source.id,
      name: source.name,
      checkInDate: checkInDate.toISOString().slice(0, 10),
      checkOutDate: checkOutDate.toISOString().slice(0, 10),
      biddingPrice: biddingPrice
    };
    try {
      const response = await axios.post(`https://localhost:4000/accommodation/${source.id}`, bidInformation);
      if (response.status === 201) {
        history('/biddinglist');
      };
    } catch (err) {
      if (err.response.status === 422) {
        console.log('Insufficient parameters')
      } 
    };
  };
  // Button readiness check
  useEffect(() => {
    if (
      checkInDate &&
      checkOutDate &&
      biddingPrice
    ) {
      setIsReady(false);
    }
  });

  return (
    <MainContainer>
      <section className='desc'>
       <h1>{source.name}</h1>
       <div>Location : {source.location} </div>
       <div>Bidding ends at : {source.due.slice(0, 10)}</div>
       <div>Minimum Price : {`${source.minPrice.slice(0, -4)},${source.minPrice.slice(-4)}`}</div>
       <div>Highest Bidding : ????????????????????????????????????????</div>
      </section>
      <section>
      <div>
        {biddingPrice ? <div>My Bidding Price : {biddingPrice}</div> : null}
        <Input
          type="number"
          placeholder="원"
          onChange={handleChangeBiddingPrice}
        />
      </div>
      <div>
        <Button onClick={openCalendarModule}>
          {checkOutDate ?
            `Check-in : ${checkInDate.getFullYear()}년 - ${checkInDate.getMonth() + 1}월 - ${checkInDate.getDate()}일`
            : 'Check-in/ Check-out'}
          <br></br>
          {checkOutDate ?
            `Check-out : ${checkOutDate.getFullYear()}년 - ${checkOutDate.getMonth() + 1}월 - ${checkOutDate.getDate()}일`
            : ''}
        </Button>
      </div>
      {openModal ?
        <CalendarModule
          handleCheckInDate={handleCheckInDate}
          handleCheckOutDate={handleCheckOutDate}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          openCalendarModule={openCalendarModule} />
        : ''
      }
      <Button onClick={() => handlePlacingBid()} disabled={isReady}>Place a bid</Button>
      </section>
    </MainContainer>
  );
};

export default AccommodationDesc;