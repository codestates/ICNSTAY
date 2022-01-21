import styled from 'styled-components';

export const Input = styled.input`
  width: 80%;
  padding: 0.8em;
  margin: 0.8em;
  border: 1px solid ${(props) => (props.error ? 'red' : 'black')};
  appearance: none;
  &:focus,
  &:active {
    appearance: none;
  }
`;
