import styled from "styled-components";

export function Home() {
  return (
    <MainContainer>
      <section>
        <h2>Integrantes:</h2>
        <ul>
          <li>Vicente Bautista Carlos Nulfo (2022-119097)</li>
          <li>Gutiérrez Mamani Diego Alonso (2019-119046)</li>
        </ul>
      </section>
      <section>
        <h2>Profesora:</h2>
        <p>ANA SILVIA CORI MORON</p>
      </section>
      <section>
        <h2>Descripción del Proyecto:</h2>
        <p>
          El proyecto está desarrollado para el curso de <strong>Investigación de Operaciones</strong>. La estructura del proyecto incluye las siguientes secciones:
        </p>
        <ul>
          <li><strong>CPM:</strong> Técnica utilizada para planificar y gestionar proyectos, identificando las tareas críticas que determinan la duración mínima del proyecto.</li>
          <li><strong>PERT:</strong> Método para analizar y representar las tareas involucradas en la finalización de un proyecto, enfocándose en la incertidumbre de los tiempos de ejecución.</li>
          <li><strong>EOQ:</strong> Modelo que calcula el volumen óptimo de pedido para minimizar los costos de inventario y pedido.</li>
          <li><strong>Decisiones:</strong> Proceso de evaluar alternativas y elegir la mejor opción en situaciones complejas o inciertas.</li>
          <li><strong>Teoría de Colas:</strong> Técnica que estudia y modela el comportamiento de sistemas de espera y servicio, optimizando recursos y tiempos en situaciones donde se forman filas o colas.</li>
        </ul>
      </section>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  height: 100vh;
  overflow-y: auto;
  padding: 40px;
  background: linear-gradient(135deg, #e9ecef, #dee2e6);
  font-family: 'Roboto', sans-serif;
  color: #495057;

  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  h2 {
    font-size: 1.5rem;
    color: #007bff;
    margin-bottom: 10px;
  }

  section {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  ul {
    list-style-type: disc;
    padding-left: 40px;
    font-size: 1.1rem;
    color: #343a40;
  }

  li {
    margin-bottom: 8px;
  }

  p {
    font-size: 1.1rem;
    color: #495057;
    line-height: 1.6;
  }

  strong {
    font-weight: bold;
  }
`;