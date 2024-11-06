import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import MyRoutes from "./routers/routes";
import Sidebar from "./components/Sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <MainContainer className={sidebarOpen ? "active" : ""}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <MyRoutes />
      </MainContainer>
    </BrowserRouter>
  );
}

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 90px auto;
  background: #1c1c1c;
  height: 100vh;

  transition: all 0.4s ease;
  color: #e5e5e5;

  &.active {
    grid-template-columns: 280px auto;
  }
`;

export default App;