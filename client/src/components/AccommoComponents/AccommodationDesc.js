import styled from 'styled-components';
import CalendarModule from '../CalendarModule';
import { useState, useEffect } from 'react';
import { Button } from '../../styles/Button';
import { Input } from '../../styles/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';
import { useSelector, useDispatch } from 'react-redux';


const MainContainer = styled.div`
  padding: 1rem;
  > .desc {
    margin-bottom: 4rem;
  }
`;

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
  const accommodationState = useSelector(state => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;
  // Get signIn state from redux
  const singInState = useSelector(state => state.signinReducer);
  const { isSignIn } = singInState.isSignIn;
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
  const goSigninPage = () => {
    history('/signin');
  }
  const handlePlacingBid = async () => {
    const bidInformation = {
      id: accommodationDetail.information.id,
      name: accommodationDetail.information.name,
      checkInDate: checkInDate.toISOString().slice(0, 10),
      checkOutDate: checkOutDate.toISOString().slice(0, 10),
      biddingPrice: biddingPrice
    };
    // SignIn status checking part
    if (isSignIn) {
      try {
        const response = await axios.post(`https://localhost:4000/accommodation/${accommodationDetail.information.id}`, bidInformation);
        if (response.status === 201) {
          history('/biddinglist');
        };
      } catch (err) {
        if (err.response.status === 422) {
          console.log('Insufficient parameters')
        } 
      };
    } else {
      setIsOpen(true);
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
       <h1>{accommodationDetail.information.name}</h1>
       <div>Location : {accommodationDetail.information.location} </div>
       <div>Bidding ends at : {accommodationDetail.information.due.slice(0, 10)}</div>
       <div>Minimum Price : {`${accommodationDetail.information.minPrice.slice(0, -4)},${accommodationDetail.information.minPrice.slice(-4)}`}</div>
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
      {isOpen ? 
        <Modal 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text={'You need to Signin'}
        handleYesButton={goSigninPage} /> 
        : null}
      </section>
    </MainContainer>
  );
};

export default AccommodationDesc;