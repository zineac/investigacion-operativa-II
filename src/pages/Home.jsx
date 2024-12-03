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
  padding: 2rem;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    border-bottom: 0.125rem solid #007bff;
    padding-bottom: 0.3125rem;
  }

  section {
    margin-bottom: 2.5rem;
    padding: 1.5rem;
    background-color: #ffffff;
    border-radius: 0.75rem;
    box-shadow: 0 0px 0.625rem 0.125rem rgba(0, 0, 0, 0.15);
  }

  ul {
    padding-left: 2.5rem;
    font-size: 1.2rem;
  }

  li {
    margin-bottom: 0.625rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.7;
  }

  strong {
    font-weight: bold;
    color: #007bff;
  }

  @media (max-width: 768px) {
    padding: 1rem;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
    }

    section {
      margin-bottom: 2rem;
      padding: 1rem;
    }

    ul {
      padding-left: 1.5rem;
      font-size: 1rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;
