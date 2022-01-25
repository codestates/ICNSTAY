import styled from 'styled-components';

export const Button = styled.button`
  width: 100%;
  background-color: ${(props) => (props.kakao ? '#FEE500' : '#fff')};
  cursor: pointer;
  padding: 0.8em;
  margin: 0.8em 0em;
  border: 1px solid ${(props) => (props.kakao ? '#FEE500' : '#000')};
  text-align: center;
  &:hover {
    background: ${(props) => (props.kakao ? '' : '#000')};
    color: ${(props) => (props.kakao ? '' : '#fff')};
    border-color: #000;
    transition: 0.7s;
  }
`;
