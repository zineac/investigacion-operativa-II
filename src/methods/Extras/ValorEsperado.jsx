import React, { useState } from 'react';
import styled from 'styled-components';

export function ValorEsperado() {
  const [numAlternativas, setNumAlternativas] = useState(2);
  const [numEstados, setNumEstados] = useState(2);
  const [alternativas, setAlternativas] = useState(['Alternativa 1', 'Alternativa 2']);
  const [estados, setEstados] = useState(['Estado 1', 'Estado 2']);
  const [probabilidades, setProbabilidades] = useState([0.6, 0.4]);
  const [resultados, setResultados] = useState([
    [50, -20],
    [15, 5]
  ]);
  const [mejorResultado, setMejorResultado] = useState(null);
  const [mejorAlternativa, setMejorAlternativa] = useState('');

  const manejarCambioNumAlternativas = (e) => {
    const valor = parseInt(e.target.value);
    setNumAlternativas(valor);
    setAlternativas(Array(valor).fill('').map((_, i) => `Alternativa ${i + 1}`));
    setResultados(Array(valor).fill(Array(numEstados).fill(0)));
  };

  const manejarCambioNumEstados = (e) => {
    const valor = parseInt(e.target.value);
    setNumEstados(valor);
    setEstados(Array(valor).fill('').map((_, i) => `Estado ${i + 1}`));
    setProbabilidades(Array(valor).fill(0));
    setResultados(resultados.map((fila) => Array(valor).fill(0)));
  };

  const manejarCambioProbabilidad = (index, valor) => {
    const nuevasProbabilidades = [...probabilidades];
    nuevasProbabilidades[index] = parseFloat(valor);
    setProbabilidades(nuevasProbabilidades);
  };

  const manejarCambioResultado = (fila, columna, valor) => {
    const nuevosResultados = [...resultados];
    nuevosResultados[fila][columna] = parseFloat(valor);
    setResultados(nuevosResultados);
  };

  const calcularValorEsperado = () => {
    const valoresEsperados = resultados.map(fila =>
      fila.reduce((acc, resultado, index) => acc + resultado * probabilidades[index], 0)
    );
    const mejor = Math.max(...valoresEsperados);
    const filaMejor = valoresEsperados.indexOf(mejor);

    setMejorResultado(mejor);
    setMejorAlternativa(alternativas[filaMejor]);
  };

  return (
    <Container>
      <FormularioContainer>
        <h2>Parámetros de Entrada</h2>
        <Etiqueta>
          Número de Alternativas
          <Input type="number" value={numAlternativas} onChange={manejarCambioNumAlternativas} min={1} />
        </Etiqueta>

        <Etiqueta>
          Número de Estados
          <Input type="number" value={numEstados} onChange={manejarCambioNumEstados} min={1} />
        </Etiqueta>

        <Tabla>
          <thead>
            <tr>
              <th>Alternativa / Estado</th>
              {estados.map((estado, index) => (
                <th key={index}>
                  <InputTabla
                    type="text"
                    value={estado}
                    onChange={(e) => {
                      const nuevosEstados = [...estados];
                      nuevosEstados[index] = e.target.value;
                      setEstados(nuevosEstados);
                    }}
                    required
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alternativas.map((alternativa, index) => (
              <tr key={index}>
                <td>{alternativa}</td>
                {resultados[index].map((valor, colIndex) => (
                  <td key={colIndex}>
                    <InputTabla
                      type="number"
                      value={valor}
                      onChange={(e) => manejarCambioResultado(index, colIndex, e.target.value)}
                      required
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Tabla>

        <Tabla>
          <tbody>
            <tr>
              <td><strong>Probabilidades</strong></td>
              {probabilidades.map((prob, index) => (
                <td key={index}>
                  <InputTabla
                    type="number"
                    value={prob}
                    onChange={(e) => manejarCambioProbabilidad(index, e.target.value)}
                    step="0.01"
                    required
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </Tabla>

        <Boton onClick={calcularValorEsperado}>Calcular</Boton>
      </FormularioContainer>

      <ResultadosContainer>
        {mejorResultado !== null ? (
          <Resultados>
            <h2>Resultados</h2>
            <p>La mejor opción es <strong>{mejorAlternativa}</strong> con un valor esperado de <strong>{mejorResultado.toFixed(2)}</strong>.</p>
          </Resultados>
        ) : (
          <p>Calculando...</p>
        )}
      </ResultadosContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  margin: 0 0 22px 0;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;
`;

const FormularioContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ResultadosContainer = styled.div`
  flex: 0.3;
  padding: 20px;
  background-color: #343a40;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tabla = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
    
`;

const InputTabla = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  margin-top: 22px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Etiqueta = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1em;
  color: #343a40;
`;

const Resultados = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-size: 1.2em;
  text-align: center;
  color: #343a40;
`;