import React from "react";
import styled, { keyframes } from "styled-components";

const Cargando = () => {
  return (
    <LoadingContainer>
      <Loader>
        <LoaderInner />
      </Loader>
    </LoadingContainer>
  );
};

/* Centramos el contenedor cuando lo usamos */
const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
`;

const loaderInnerAnimation = keyframes`
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
`;

const Loader = styled.span`
  width: 30px;
  height: 30px;
  border: 4px solid #fff;
  animation: ${loaderAnimation} 2s infinite ease;
`;

const LoaderInner = styled.span`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  background-color: #fff;
  animation: ${loaderInnerAnimation} 2s infinite ease;
`;

export default Cargando;