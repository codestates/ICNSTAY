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
`;

const ModalContainer = styled.div`
  width: 700px;
  background-color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.8em;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
    height: 80%;
  }
  @media ${({ theme }) => theme.device.mobile} {
    height: 85%;
  }
`;

const ModalContent = styled.div`
  font-size: 1.5rem;
  > span {
    padding-left: 0.5em;
    cursor: pointer;
  }
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 1rem;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.8em;
  @media ${({ theme }) => theme.device.tablet} {
    padding: 0;
    flex-direction: column;
  }
`;

const CalendarBox = styled.div`
  width: 45%;
  @media ${({ theme }) => theme.device.tablet} {
    width: 80%;
  }
`;
const CalendarContent = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    width: 100%;
  }
`;

const CalendarName = styled.div`
  padding: 0.8em 0em;
  font-size: 1rem;
  @media ${({ theme }) => theme.device.tablet} {
    font-size: 0.8rem;
  }
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
          <CalendarBox style={{ marginBottom: '10px' }}>
            <CalendarName>CheckIn</CalendarName>
            <CalendarContent>
              <Calendar onChange={handleCheckInDate} value={checkInDate} minDate={new Date()} />
            </CalendarContent>
          </CalendarBox>
          <CalendarBox>
            <CalendarName>CheckOut</CalendarName>
            <CalendarContent>
              <Calendar onChange={handleCheckOutDate} value={checkOutDate} minDate={checkInDate} />
            </CalendarContent>
          </CalendarBox>
        </CalendarContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default CalendarModule;
