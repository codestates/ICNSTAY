import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  div {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    transform: scale(0);
    background: red;
    animation: scaling 3s ease-in-out infinite;
    display: inline-block;
    margin: .5rem;
  }

  .first {
    animation-delay: 0s;
  }

  .second {
    animation-delay: 0.2s;
  }

  .third {
    animation-delay: 0.4s;
  }

  .fourth {
    animation-delay: 0.6s;
  }

  @keyframes scaling {
  0%,
  100% {
      transform: scale(0.2);
      background-color: #3083ff;
  }
  45% {
      transform: scale(0.6);
      background-color: #0fff07;
  }
  50% {
      transform: scale(0.6);
      background-color: #ff3083;
      border-radius: 0%;
  }
}`;

const Preloader = () => {
  return (
    <LoaderContainer>
      <div className="first"></div>
      <div className="second"></div>
      <div className="third"></div>
      <div className="fourth"></div>
    </LoaderContainer>
  );
};

export default Preloader;