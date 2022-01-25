import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 850px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.device.mobile} {
    height: auto;
    margin-top: 3.5em;
  }
`;

export const Header = styled.div`
  width: 100%;
  letter-spacing: 0.4em;
  font-size: 1.2rem;
  margin-bottom: 1.5em;
  padding-bottom: 3em;
  font-weight: 700;
  text-align: center;
  border-bottom: 2px solid ${(props) => props.theme.black};
`;

export const ErrorMessage = styled.div`
  font-size: 0.8rem;
  color: #ff0000;
  text-align: ${(props) => (props.type ? 'center' : '')};
  margin-top: ${(props) => (props.type ? '0.4em' : '')};
`;
