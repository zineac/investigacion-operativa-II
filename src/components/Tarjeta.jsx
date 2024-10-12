// Tarjeta.js
import React from "react";
import styled from "styled-components";

const Tarjeta = ({ titulo, valor, simbolo = "" }) => {
  return (
    <TarjetaContainer>
      <strong>{titulo}:</strong>
      <p>
        {valor.toFixed(2)} {simbolo}
      </p>
    </TarjetaContainer>
  );
};

const TarjetaContainer = styled.div`}
  font-family: 'Roboto', sans-serif;
  background-color: #495057;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  min-width: 400px;
  text-align: center;

  strong {
    display: block;
    margin-bottom: 10px;
    font-size: 1.2em;
  }

  p {
    font-size: 1.1em;
    margin: 0;
  }
`;

export default Tarjeta;
