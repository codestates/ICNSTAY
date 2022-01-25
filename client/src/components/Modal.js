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
`;

const ModalContainer = styled.div`
  width: 60%;
  background-color: #fff;
  text-align: center;
  padding: 2em;
  @media ${({ theme }) => theme.device.mobile} {
    width: 300px;
    padding: 2em;
  }
`;

const ModalContent = styled.div`
  padding-bottom: 2em;
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
              <Button
                type={'YES'}
                onClick={handleYesButton}
                style={{ width: '70%', marginRight: '2em' }}
              >
                네
              </Button>
              <Button onClick={handleModal} style={{ width: '70%' }}>
                아니요
              </Button>
            </ButtonContainer>
          </ModalContainer>
        </ModalBackground>
      ) : null}
    </>
  );
};

const SignupModal = ({ handleSuccessModal }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalContent>회원가입에 성공하였습니다</ModalContent>
        <Button onClick={handleSuccessModal}>로그인을 해주세요</Button>
      </ModalContainer>
    </ModalBackground>
  );
};

export { Modal, SignupModal };
