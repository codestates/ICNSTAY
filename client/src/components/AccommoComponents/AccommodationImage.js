import styled from 'styled-components';
import testImage from '../../data/githubIcon.png';
import AccommodationThumb from './AccommodationThumb';
import React, { useEffect, useState, useRef, forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";




const MainContainer = styled.div`
  padding: 2rem 10rem 2rem 0rem;
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
`;

const AccommodationImage = () => {
  return (
    <MainContainer>
      <Wrapper>
        <span><FontAwesomeIcon icon={faAngleLeft} size='4x'/></span>
        <img src={testImage}></img>
        <span><FontAwesomeIcon icon={faAngleRight} size='4x'/></span>
      </Wrapper>
      <AccommodationThumb />
    </MainContainer>
  );
};

export default AccommodationImage;