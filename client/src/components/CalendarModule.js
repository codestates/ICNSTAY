import Calendar from 'react-calendar';
import './Calendar.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

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
  background-color: #fff;
  text-align: center;
  padding: 0.8em;
`;

const ModalContent = styled.div`
  font-size: 1.7em;
  > span {
    padding-left: 0.5em;
    cursor: pointer;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.8em 0em;
`;

const CalendarBox = styled.div`
  width: 45%;
`;

const CalendarName = styled.div`
  padding: 0.8em 0em;
  font-size: 1em;
`;

const CalendarModule = ({
  handleCheckInDate,
  handleCheckOutDate,
  checkInDate,
  checkOutDate,
  openCalendarModule,
}) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalContent>
          Choose Dates
          <span>
            <FontAwesomeIcon icon={faTimes} size="sm" onClick={openCalendarModule} />
          </span>
        </ModalContent>
        <CalendarContainer>
          <CalendarBox>
            <CalendarName>CheckIn</CalendarName>
            <Calendar onChange={handleCheckInDate} value={checkInDate} />
          </CalendarBox>
          <CalendarBox>
            <CalendarName>CheckOut</CalendarName>
            <Calendar onChange={handleCheckOutDate} value={checkOutDate} minDate={checkInDate} />
          </CalendarBox>
        </CalendarContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CalendarModule;
