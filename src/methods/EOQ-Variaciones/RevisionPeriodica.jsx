import React, { useState } from "react";
import styled from "styled-components";
import Cargando from '../../components/Cargando'
import Tarjeta from "../../components/Tarjeta";
import { inversaDistribucionNormal } from "../../utils/probabilidadInversa";

export function RevisionPeriodica() {
  const [mediaDemanda, setMediaDemanda] = useState(250);
  const [desviacionDemanda, setDesviacionDemanda] = useState(45);
  const [porcentaje, setPorcentaje] = useState(99); // Se ingresa el porcentaje
  const [nivelReposicion, setNivelReposicion] = useState(null);

  const calcularNivelReposicion = (e) => {
    e.preventDefault();

    // Cálculo de z usando el porcentaje
    const z = inversaDistribucionNormal(porcentaje / 100);
    
    // Cálculo de M (Nivel de Reposición)
    const M = mediaDemanda + z * desviacionDemanda;
    setNivelReposicion(M);
  };

  return (
    <Contenedor>
      <FormularioContainer>
        <form onSubmit={calcularNivelReposicion}>
          <h2>Parámetros de Entrada</h2>
          <Etiqueta>
            Media de Demanda (μ)
            <Input
              type="number"
              value={mediaDemanda}
              onChange={(e) => setMediaDemanda(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Desviación Estándar de la Demanda (σ)
            <Input
              type="number"
              value={desviacionDemanda}
              onChange={(e) => setDesviacionDemanda(e.target.value)}
              required
            />
          </Etiqueta>
          <Etiqueta>
            Porcentaje de Confianza
            <Input
              type="number"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
              required
            />
          </Etiqueta>
          <Boton type="submit">Calcular</Boton>
        </form>
      </FormularioContainer>

      <Resultados>
        {nivelReposicion ? (
          <ResultadosContainer>
            <Tarjeta titulo="Nivel de Reposición (M)" valor={nivelReposicion} simbolo="unidades" />
          </ResultadosContainer>
        ) : (
          <Cargando />
        )}
      </Resultados>
    </Contenedor>
  );
}

const Contenedor = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
  height: 100%;
  width: 100%;
  margin: 0 0 120px 0;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;

  form {
    padding: 25px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    height: auto;
  }
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  max-width: 400px;
`;

const Boton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Resultados = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: auto;
`;

const ResultadosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
