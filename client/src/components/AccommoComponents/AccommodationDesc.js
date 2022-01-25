import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CalendarModule from '../CalendarModule';
import { Modal } from '../Modal';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import axios from 'axios';
import { useSelector } from 'react-redux';

const MainContainer = styled.div`
  /* padding: 1rem; */
  > div {
    &:first-child {
      margin-bottom: 1.5em;
    }
    &:last-child {
      /* text-align: center; */
    }
  }
`;

const HotelBox = styled.div`
  /* border: 1px solid red; */
`;

const HotelName = styled.div`
  font-size: 1.8em;
  font-weight: 500;
  padding-bottom: 0.5em;
  border-bottom: 3px solid #000;
`;

const HotelInfo = styled.div`
  border-bottom: 1px solid #c4c4c4;
  display: flex;
  align-items: center;
  padding: 0.5em 0em;
`;

const InfoLabel = styled.div`
  color: #c4c4c4;
  font-weight: 500;
  font-size: 0.8em;
  padding: 0.5em 0;
  margin-right: 0.5em;
  width: 35%;
`;

const InfoContent = styled.div``;

const Price = styled.div``;

const AccommodationDesc = () => {
  // Setup variances
  const history = useNavigate();
  // Input data variances
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [biddingPrice, setBiddingPrice] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isReady, setIsReady] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
   
  // Get accommodation state information from redux
  const accommodationState = useSelector((state) => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;
  
  // Event handlers
  const openCalendarModule = () => {
    setOpenModal(!openModal);
  };
  const handleChangeBiddingPrice = (event) => {
    setBiddingPrice(event.target.value);
  };
  const handleCheckInDate = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDate = (date) => {
    setCheckOutDate(date);
  };
  const goSigninPage = () => {
    history('/signin');
  };
  const handlePlacingBid = async () => {
    const bidInformation = {
      id: accommodationDetail.information.id,
      name: accommodationDetail.information.name,
      checkInDate: checkInDate.toISOString().slice(0, 10),
      checkOutDate: checkOutDate.toISOString().slice(0, 10),
      biddingPrice: biddingPrice,
    };
    // SignIn status checking part
    if (localStorage.getItem('isSignIn')) {
      try {
        const response = await axios.post(
          `https://localhost:4000/accommodation/${accommodationDetail.information.id}`,
          bidInformation
        );
        if (response.status === 201) {
          history('/biddinglist');
        }
      } catch (err) {
        if (err.response.status === 422) {
          console.log('Insufficient parameters');
        }
      }
    } else {
      setIsOpen(true);
    }
  };
  // Button readiness check
  useEffect(() => {
    if (checkInDate && checkOutDate && biddingPrice) {
      setIsReady(false);
    }
  });

  return (
    <MainContainer>
      <HotelBox>
        <HotelName>{accommodationDetail.information.name}</HotelName>
        <HotelInfo>
          <InfoLabel>location</InfoLabel>
          <InfoContent>{accommodationDetail.information.location}</InfoContent>
        </HotelInfo>
        <HotelInfo>
          <InfoLabel>bidding ends at</InfoLabel>
          <InfoContent>{accommodationDetail.information.due.slice(0, 10)}</InfoContent>
        </HotelInfo>
        <HotelInfo>
          <InfoLabel>minimum price</InfoLabel>
          <InfoContent>{`${accommodationDetail.information.minPrice.slice(
            0,
            -4
          )}${accommodationDetail.information.minPrice.slice(-4)}`}</InfoContent>
        </HotelInfo>
        <HotelInfo>
          <InfoLabel>highest bidding</InfoLabel>
          <InfoContent>??????????????</InfoContent>
        </HotelInfo>
      </HotelBox>
      <HotelBox>
        <Price>{biddingPrice ? `My Bidding Price : ${biddingPrice}원` : 'TRY BIDS!'}</Price>
        <Input
          type="number"
          placeholder="원"
          onChange={handleChangeBiddingPrice}
          style={{ textAlign: 'right', marginLeft: 0, width: '100%' }}
        />

        <Button onClick={openCalendarModule} style={{ marginLeft: 0, width: '100%' }}>
          {checkOutDate
            ? `Check-in : ${checkInDate.getFullYear()}-${
                checkInDate.getMonth() + 1
              }-${checkInDate.getDate()}`
            : 'Check-in / Check-out'}
          <br></br>
          {checkOutDate
            ? `Check-out : ${checkOutDate.getFullYear()}-${
                checkOutDate.getMonth() + 1
              }-${checkOutDate.getDate()}`
            : ''}
        </Button>

        {openModal ? (
          <CalendarModule
            handleCheckInDate={handleCheckInDate}
            handleCheckOutDate={handleCheckOutDate}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            openCalendarModule={openCalendarModule}
          />
        ) : (
          ''
        )}
        <Button
          onClick={() => handlePlacingBid()}
          disabled={isReady}
          style={{ marginLeft: 0, width: '100%' }}
        >
          Place a bid
        </Button>
        {isOpen ? (
          <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={'You need to Signin'}
            handleYesButton={goSigninPage}
          />
        ) : null}
      </HotelBox>
    </MainContainer>
  );
};

export default AccommodationDesc;
