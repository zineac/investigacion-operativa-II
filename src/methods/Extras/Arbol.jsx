import React, { useState } from 'react';
import styled from 'styled-components';

export function Arbol() {
  const [numDecisiones, setNumDecisiones] = useState(2);
  const [decisiones, setDecisiones] = useState(['Decisión 1', 'Decisión 2']);
  const [resultados, setResultados] = useState([
    [{ probabilidad: 0.5, resultado: 100 }, { probabilidad: 0.5, resultado: -50 }],
    [{ probabilidad: 0.6, resultado: 200 }, { probabilidad: 0.4, resultado: -30 }],
  ]);
  const [valoresEsperados, setValoresEsperados] = useState([]);

  const calcularValorEsperado = () => {
    const nuevosValoresEsperados = resultados.map((resultado) =>
      resultado.reduce((suma, { probabilidad, resultado }) => suma + (probabilidad * resultado), 0)
    );
    setValoresEsperados(nuevosValoresEsperados);
  };

  const manejarCambioResultado = (decisionIndex, resultadoIndex, campo, valor) => {
    const nuevaMatriz = [...resultados];
    nuevaMatriz[decisionIndex][resultadoIndex][campo] = parseFloat(valor);
    setResultados(nuevaMatriz);
  };

  const manejarCambioNumDecisiones = (e) => {
    const valor = parseInt(e.target.value);
    setNumDecisiones(valor);
    setDecisiones(Array.from({ length: valor }, (_, i) => `Decisión ${i + 1}`));
    setResultados(Array.from({ length: valor }, () => [{ probabilidad: 0.5, resultado: 100 }, { probabilidad: 0.5, resultado: -50 }]));
  };

  return (
    <Container>
      <h2>Método de Árbol de Decisiones</h2>

      <Section>
        <label>
          Cantidad de Decisiones:
          <Input
            type="number"
            value={numDecisiones}
            onChange={manejarCambioNumDecisiones}
            min="1"
          />
        </label>
      </Section>

      {decisiones.map((decision, decisionIndex) => (
        <Section key={decisionIndex}>
          <h3>{decision}</h3>
          <table>
            <thead>
              <tr>
                <th>Probabilidad</th>
                <th>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {resultados[decisionIndex].map((resultado, resultadoIndex) => (
                <tr key={resultadoIndex}>
                  <td>
                    <Input
                      type="number"
                      value={resultado.probabilidad}
                      onChange={(e) =>
                        manejarCambioResultado(decisionIndex, resultadoIndex, 'probabilidad', e.target.value)
                      }
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </td>
                  <td>
                    <Input
                      type="number"
                      value={resultado.resultado}
                      onChange={(e) =>
                        manejarCambioResultado(decisionIndex, resultadoIndex, 'resultado', e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}

      <Button onClick={calcularValorEsperado}>Calcular Valores Esperados</Button>

      <Section>
        <h3>Valores Esperados</h3>
        {valoresEsperados.map((valor, index) => (
          <p key={index}>
            {decisiones[index]}: {valor.toFixed(2)}
          </p>
        ))}
      </Section>
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Input = styled.input`
  margin: 10px 15px;
  padding: 10px;
  width: 100px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: #17a2b8;  /* Celeste para el botón */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 25px;  /* Margin-bottom de 20px */
  transition: background-color 0.3s;

  &:hover {
    background-color: #138496;
  }
`;

export default Arbol; 
