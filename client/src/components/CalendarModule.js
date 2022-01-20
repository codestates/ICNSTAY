import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const ModalContainer = styled.div`
  width: 50%;
  background-color: white;
  border-radius: 5px;
  text-align: center;
`;

const ModalContent = styled.div`
  font-size: 2em; 
  padding: 0.8em;
  > span {
    padding-left: 2em;
    cursor: pointer;
  }
`;

const CalendarContainer = styled.div`
  padding: 0.8em;
  display:flex;
  > span {
    margin: 2em;
  }
`;

const CalendarModule = ({ handleCheckInDate, handleCheckOutDate, checkInDate, checkOutDate, openCalendarModule }) => {

  return (
  <ModalBackground>
    <ModalContainer>
      <ModalContent>
        Choose Dates
        <span><FontAwesomeIcon icon={faTimes} onClick={openCalendarModule}/></span>      
      </ModalContent>
      <CalendarContainer>
        <span>
          <div><h3>CheckIn</h3></div>
          <Calendar onChange={handleCheckInDate} value={checkInDate} />
        </span>
        <span>
          <div><h3>CheckOut</h3></div>
          <Calendar onChange={handleCheckOutDate} value={checkOutDate} minDate={checkInDate}/>
        </span>
      </CalendarContainer>
    </ModalContainer>
  </ModalBackground>
  );
};

export default CalendarModule;