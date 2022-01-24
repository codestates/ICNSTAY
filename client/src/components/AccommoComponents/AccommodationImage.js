import styled from 'styled-components';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faCircle } from "@fortawesome/free-solid-svg-icons";




const MainContainer = styled.div`
  padding: 2rem 10rem 2rem 0rem;
  section {   
    text-align: center;
    > span {
      cursor: pointer;
      padding: 0.4rem;
    }
  }
  .gray {
      color: gray;
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;  
  > span {
    padding-left: 2em;
    padding-right: 2em;
    cursor: pointer;
  }
  > img {
    height: 500px;
    overflow: hidden;
    border-radius: 1em;
  }
`;

const AccommodationImage = ({ source }) => {
  const index = useRef(0);
  const [currentImage, setCurrentImage] = useState(source.image[0]);

  const moveLeft = () => {
    index.current --;
    setCurrentImage(source.image[index.current]);
  };
  const moveRight = () => {
    index.current ++;
    setCurrentImage(source.image[index.current]);
  };
  const changeImage = (event) => {
    index.current = event;
    setCurrentImage(source.image[event]);
  }

  return (
    <MainContainer>
      <Wrapper>
        <span>{index.current === 0? <FontAwesomeIcon icon={faAngleLeft} size='4x' className='gray'/> : <FontAwesomeIcon icon={faAngleLeft} size='4x' onClick={moveLeft} />}</span>
        <img src={currentImage}></img>
        <span>{index.current === source.image.length-1 ? <FontAwesomeIcon icon={faAngleRight} size='4x' className='gray'/> : <FontAwesomeIcon icon={faAngleRight} size='4x' onClick={moveRight} />}</span>
      </Wrapper>
      <section>
        {source.image.map((item, idx) => <span key={idx}><FontAwesomeIcon icon={faCircle} onClick={()=> changeImage(idx)} size='1x' className={index.current === idx ? '' : 'gray'}/></span>)}
      </section>
    </MainContainer>
  );
};

export default AccommodationImage;