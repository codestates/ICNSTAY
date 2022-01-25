import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from 'react-redux';



const MainContainer = styled.div`
  /* padding: 2rem 5rem 2rem 0rem; */
  padding-right: 2em;

  .gray {
    color: #c4c4c4;
  }
`;

const Wrapper = styled.div`
  /* padding: 1rem; */
  display: flex;
  align-items: center;
`;

const ArrowIcon = styled.div`
  padding-left: 2em;
  padding-right: 2em;
  cursor: pointer;
`;

const CardImg = styled.div`
  width: 500px;
  height: 300px;
  background-image: url(${(props) => props.src});
  background-position: center center;
  background-size: cover;
`;

const DotIconBox = styled.div`
  margin-top: 1em;
  text-align: center;
  > span {
    cursor: pointer;
    padding: 0.4rem;
  }
`;

const AccommodationImage = () => {
  const accommodationState = useSelector(state => state.accommodationReducer);
  const { accommodationDetail } = accommodationState;

  const index = useRef(0);
  const [currentImage, setCurrentImage] = useState(accommodationDetail.information.image[0]);

  const moveLeft = () => {
    index.current --;
    setCurrentImage(accommodationDetail.information.image[index.current]);
  };
  const moveRight = () => {
    index.current ++;
    setCurrentImage(accommodationDetail.information.image[index.current]);
  };
  const changeImage = (event) => {
    index.current = event;
    setCurrentImage(accommodationDetail.information.image[event]);
  }

  return (
    <MainContainer>
      <Wrapper>
        <ArrowIcon>
          {index.current === 0 ? (
            <FontAwesomeIcon icon={faAngleLeft} size="3x" className="gray" />
          ) : (
            <FontAwesomeIcon icon={faAngleLeft} size="3x" onClick={moveLeft} />
          )}
        </ArrowIcon>
        <CardImg src={currentImage}></CardImg>
        <ArrowIcon>
          {index.current === accommodationDetail.information.image.length - 1 ? (
            <FontAwesomeIcon icon={faAngleRight} size="3x" className="gray" />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} size="3x" onClick={moveRight} />
          )}
        </ArrowIcon>
      </Wrapper>
      <DotIconBox>
        {accommodationDetail.information.image.map((item, idx) => (
          <span key={idx}>
            <FontAwesomeIcon
              icon={faCircle}
              onClick={() => changeImage(idx)}
              size="1x"
              className={index.current === idx ? '' : 'gray'}
            />
          </span>
        ))}
      </DotIconBox>
    </MainContainer>
  );
};

export default AccommodationImage;
