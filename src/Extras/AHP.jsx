import React, { useState } from 'react';
import styled from 'styled-components';

export function AHP() {
  const [numCriterios, setNumCriterios] = useState(4);
  const [numAlternativas, setNumAlternativas] = useState(4);
  const [criterios, setCriterios] = useState(['Criterio 1', 'Criterio 2', 'Criterio 3', 'Criterio 4']);
  const [alternativas, setAlternativas] = useState(['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4']);

  const [matrizCriterios, setMatrizCriterios] = useState([
    [1, 5, 5, 7],
    [0.2, 1, 1, 3],
    [0.2, 1, 1, 3],
    [0.1429, 0.3333, 0.3333, 1]
  ]);

  const [matricesAlternativas, setMatricesAlternativas] = useState([
    [
      [1, 0.25, 4, 0.1667],
      [4, 1, 4, 0.25],
      [0.25, 0.25, 1, 0.2],
      [6, 4, 5, 1]
    ],
    [
      [1, 2, 5, 1],
      [0.5, 1, 3, 2],
      [0.2, 0.3333, 1, 0.25],
      [1, 0.5, 4, 1]
    ],
    [
      [1, 0.3333, 0.1429, 0.2],
      [3, 1, 0.2, 0.3333],
      [7, 5, 1, 3],
      [5, 3, 0.3333, 1]
    ],
    [
      [1, 0.3333, 0.25, 0.3333],
      [3, 1, 0.5, 1],
      [4, 2, 1, 2],
      [3, 1, 0.5, 1]
    ]
  ]);

  const [vectorPrioridad, setVectorPrioridad] = useState([]);
  const [vectoresPrioridadAlternativas, setVectoresPrioridadAlternativas] = useState([]);
  const [puntajesFinales, setPuntajesFinales] = useState([]);

  const manejarCambioMatriz = (tipoMatriz, indice1, indice2, valor, indiceCriterio = null) => {
    if (tipoMatriz === 'criterios') {
      const nuevaMatriz = [...matrizCriterios];
      nuevaMatriz[indice1][indice2] = parseFloat(valor);
      nuevaMatriz[indice2][indice1] = 1 / parseFloat(valor);
      setMatrizCriterios(nuevaMatriz);
    } else if (tipoMatriz === 'alternativas') {
      const nuevasMatrices = [...matricesAlternativas];
      nuevasMatrices[indiceCriterio][indice1][indice2] = parseFloat(valor);
      nuevasMatrices[indiceCriterio][indice2][indice1] = 1 / parseFloat(valor);
      setMatricesAlternativas(nuevasMatrices);
    }
  };

  const calcularVectoresPrioridad = () => {
    const calcularPrioridad = (matriz) => {
      const tamaño = matriz.length;
      const sumaColumnas = Array(tamaño).fill(0);

      for (let i = 0; i < tamaño; i++) {
        for (let j = 0; j < tamaño; j++) {
          sumaColumnas[j] += matriz[i][j];
        }
      }

      const matrizNormalizada = matriz.map((fila, i) =>
        fila.map((valor, j) => valor / sumaColumnas[j])
      );

      return matrizNormalizada.map(
        (fila) => fila.reduce((suma, val) => suma + val, 0) / tamaño
      );
    };

    const nuevoVectorPrioridad = calcularPrioridad(matrizCriterios);
    setVectorPrioridad(nuevoVectorPrioridad);

    const nuevosVectoresPrioridadAlternativas = matricesAlternativas.map((matriz) =>
      calcularPrioridad(matriz)
    );
    setVectoresPrioridadAlternativas(nuevosVectoresPrioridadAlternativas);

    // Calcular puntajes finales
    const calcularPuntajesFinales = (vectoresAltPrioridad, vectorCritPrioridad) => {
      const numAlternativas = vectoresAltPrioridad[0].length;
      const puntajesFinales = Array(numAlternativas).fill(0);

      for (let i = 0; i < numAlternativas; i++) {
        for (let j = 0; j < vectorCritPrioridad.length; j++) {
          puntajesFinales[i] += vectoresAltPrioridad[j][i] * vectorCritPrioridad[j];
        }
      }

      return puntajesFinales;
    };

    const puntajes = calcularPuntajesFinales(nuevosVectoresPrioridadAlternativas, nuevoVectorPrioridad);
    setPuntajesFinales(puntajes);
  };

  const manejarCambioNumCriterios = (e) => {
    const valor = parseInt(e.target.value);
    setNumCriterios(valor);
    setCriterios(Array.from({ length: valor }, (_, i) => `Criterio ${i + 1}`));
    setMatrizCriterios(Array.from({ length: valor }, () => Array(valor).fill(1)));
    setMatricesAlternativas(Array.from({ length: valor }, () => Array.from({ length: numAlternativas }, () => Array(numAlternativas).fill(1))));
  };

  const manejarCambioNumAlternativas = (e) => {
    const valor = parseInt(e.target.value);
    setNumAlternativas(valor);
    setAlternativas(Array.from({ length: valor }, (_, i) => `Alternativa ${i + 1}`));
    setMatricesAlternativas(Array.from({ length: numCriterios }, () => Array.from({ length: valor }, () => Array(valor).fill(1))));
  };

  return (
    <Container>
      <h2>Metodo de AHP</h2>

      <Section>
        <label>
          Cantidad de Criterios:
          <Input type="number" value={numCriterios} onChange={manejarCambioNumCriterios} min="1" />
        </label>
        <label>
          Cantidad de Alternativas:
          <Input type="number" value={numAlternativas} onChange={manejarCambioNumAlternativas} min="1" />
        </label>
      </Section>

      <Section>
        <h3>Matriz de Criterios</h3>
        <table>
          <tbody>
            {matrizCriterios.map((fila, i) => (
              <tr key={i}>
                {fila.map((valor, j) => (
                  <td key={j}>
                    <Input
                      type="number"
                      value={valor}
                      onChange={(e) =>
                        manejarCambioMatriz('criterios', i, j, e.target.value)
                      }
                      disabled={i === j}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {criterios.map((criterio, indiceCriterio) => (
        <Section key={indiceCriterio}>
          <h3>Matriz de Alternativas para {criterio}</h3>
          <table>
            <tbody>
              {matricesAlternativas[indiceCriterio].map((fila, i) => (
                <tr key={i}>
                  {fila.map((valor, j) => (
                    <td key={j}>
                      <Input
                        type="number"
                        value={valor}
                        onChange={(e) =>
                          manejarCambioMatriz(
                            'alternativas',
                            i,
                            j,
                            e.target.value,
                            indiceCriterio
                          )
                        }
                        disabled={i === j}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
      ))}

      <Button onClick={calcularVectoresPrioridad}>Calcular Vectores de Prioridad</Button>

      <Section>
        <h3>Vector de Prioridad de Criterios</h3>
        {vectorPrioridad.map((valor, index) => (
          <p key={index}>
            {criterios[index]}: {valor.toFixed(4)}
          </p>
        ))}
      </Section>

      <Section>
        <h3>Vectores de Prioridad de Alternativas</h3>
        {vectoresPrioridadAlternativas.map((vector, index) => (
          <div key={index}>
            <h4>Para {criterios[index]}</h4>
            {vector.map((valor, indiceAlt) => (
              <p key={indiceAlt}>
                {alternativas[indiceAlt]}: {valor.toFixed(4)}
              </p>
            ))}
          </div>
        ))}
      </Section>

      <Section>
        <h3>Resultados Finales</h3>
        {puntajesFinales.map((puntaje, index) => (
          <p key={index}>
            {alternativas[index]}: {puntaje.toFixed(4)}
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
  width: 80px;
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

export default AHP;
