import React, { useState } from "react";
import { MyRoutes } from "./routers/routes";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Sidebar } from "./components/sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Container className={sidebarOpen ? "sidebarState active" : ""}>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <RoutesContainer>
          <MyRoutes />
        </RoutesContainer>
      </Container>
    </BrowserRouter>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: #1c1c1c;
  height: 100vh;
  transition: all 0.3s;

  &.active {
    grid-template-columns: 300px auto;
  }

  color: #f1f1f1;
`;

const RoutesContainer = styled.div`
  overflow-y: auto;
  background: #f8f9fa;
`;


export default App;