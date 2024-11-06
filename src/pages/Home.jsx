import styled from "styled-components";

export function Home() {
  return (
    <MainContainer>
      <section>
        <h2>Integrantes:</h2>
        <ul>
          <li>Carlos Nulfo Vicente Bautista</li>
          <li>Diego Alonso Gutiérrez Mamani</li>
        </ul>
      </section>
      <section>
        <h2>Descripción del Proyecto:</h2>
        <p>
          Este proyecto fue desarrollado para el curso de <strong>Investigación de Operaciones</strong>, abordando las siguientes técnicas:
        </p>
        <ul>
          <li>
            <strong>CPM:</strong> Método de planificación que identifica las tareas críticas para cumplir con los plazos del proyecto.
          </li>
          <li>
            <strong>PERT:</strong> Técnica que analiza la duración de las tareas, considerando la incertidumbre en sus tiempos de ejecución.
          </li>
          <li>
            <strong>EOQ:</strong> Modelo que optimiza el volumen de pedidos para reducir costos de inventario y pedidos.
          </li>
          <li>
            <strong>Decisiones:</strong> Proceso para evaluar alternativas y seleccionar la mejor opción en situaciones complejas.
          </li>
          <li>
            <strong>Teoría de Colas:</strong> Estudio y optimización de sistemas de espera para mejorar la eficiencia en la atención de clientes.
          </li>
        </ul>
      </section>
    </MainContainer>
  );
}

const MainContainer = styled.main`
  padding: 40px;
  font-family: 'Roboto', sans-serif;
  color: #5b5b5b;

  h2 {
    font-size: 1.8rem;
    color: #5b5b5b;
    margin-bottom: 15px;
    border-bottom: 2px solid #007bff;
    padding-bottom: 5px;
  }

  section {
    margin-bottom: 40px;
    padding: 25px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.15);
  }

  ul {
    padding-left: 40px;
    font-size: 1.2rem;
    color: #343a40;
  }

  li {
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    color: #495057;
    line-height: 1.7;
  }

  strong {
    font-weight: bold;
    color: #007bff;
  }
`;
