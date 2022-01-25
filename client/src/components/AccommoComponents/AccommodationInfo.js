import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

const MainContainer = styled.div`
  padding: 1rem;
`;

const AccommodationInfo = () => {

  // Get accommodation state information from redux
  const accommodationState = useSelector(state => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;

  return (
    <MainContainer>
      <h1>Information Section</h1>
        <div>{accommodationDetail.information.description}</div>
    </MainContainer>
  );
};

export default AccommodationInfo;