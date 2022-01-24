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
`;

const ModalButton = styled.button`
  all: unset;
  padding: 0.8em;
  cursor: pointer;
  color: ${(props) => (props.type === 'YES' ? 'pink' : 'blue')};
  border: 1px solid ${(props) => (props.type === 'YES' ? 'pink' : 'blue')};
  margin-left: 5px;
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
            <ModalButton type={'YES'} onClick={handleYesButton}>
              YES
            </ModalButton>
            <ModalButton onClick={handleModal}>NO</ModalButton>
          </ModalContainer>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default Modal;
