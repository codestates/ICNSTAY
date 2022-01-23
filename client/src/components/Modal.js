import styled from 'styled-components';
import { Button } from '../styles/Button';

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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Modal = ({ isOpen, setIsOpen, text, handleYesButton }) => {
  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? (
        <ModalBackground>
          <ModalContainer>
            <ModalContent>{text}</ModalContent>
            <ButtonContainer>
              <Button type={'YES'} onClick={handleYesButton}>
                YES
              </Button>
              <Button onClick={handleModal}>NO</Button>
            </ButtonContainer>
          </ModalContainer>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
