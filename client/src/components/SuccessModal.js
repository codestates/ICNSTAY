import styled from 'styled-components';

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
  padding: 0.8em;
  font-weight: bold;
`;

const ModalButton = styled.button`
  all: unset;
  padding: 0.8em;
  cursor: pointer;
  color: pink;
  border: 1px pink;
  margin-left: 5px;
`;
const SuccessModal = ({ handleSuccessModal }) => {

  return (
    <>
        <ModalBackground>
          <ModalContainer>
            <ModalContent>Thank you for Registration!</ModalContent>
            <ModalButton onClick={handleSuccessModal}>
              Go to Sign-In
            </ModalButton>
          </ModalContainer>
        </ModalBackground>
    </>
  );
};

export default SuccessModal;
