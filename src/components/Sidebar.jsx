import { NavLink } from "react-router-dom";
import {
  AiOutlineDeploymentUnit ,
  AiTwotoneBank,
  AiOutlineLeft,
  AiOutlineBranches, 
  AiOutlineDotChart, 
  AiOutlineLineChart,
  AiOutlineNodeIndex,
  AiOutlineBulb,
  AiOutlineCodeSandbox,
  AiOutlineEuro,
  AiOutlineShareAlt
} from "react-icons/ai";
import styled from "styled-components";
import logo from "../assets/react.svg";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SidebarContainer isOpen={sidebarOpen}>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="Logocontent">
        <img src={logo} />
        <h2>METODOS</h2>
      </div>
      {linksArray.map(({ label, icon, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink to={to} className={({ isActive }) => `Links ${isActive ? `active` : ``}`}>
            <div className="icon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const linksArray = [
  {
    label: "Inicio",
    icon: <AiTwotoneBank />,
    to: "/",
  },
  {
    label: "CPM",
    icon: <AiOutlineDeploymentUnit />,
    to: "/CPM",
  },
  {
    label: "PERT",
    icon: <AiOutlineBranches />,
    to: "/PERT",
  },
  {
    label: "EOQ",
    icon: <AiOutlineLineChart />,
    to: "/EOQ",
  },
  {
    label: "Teoría de decisiones",
    icon: <AiOutlineDotChart />,
    to: "/Decisiones",
  },
  {
    label: "Teoría de colas", // Nuevo enlace para Tcolas
    icon: <AiOutlineBulb />,
    to: "/Tcolas",
  },
  //{
   // label: "Asignacion de recursos", // Nuevo enlace para Tcolas
   // icon: <AiOutlineCodeSandbox />,
   // to: "/Asignacion",
  //},
  {
    label: "Programacion no lineal", // Nuevo enlace para Tcolas
    icon: <AiOutlineEuro />,
    to: "/Optimizacion",
  },
  {
    label: "Programacion dinamica", // Nuevo enlace para Tcolas
    icon: <AiOutlineShareAlt />,
    to: "/Pdinamica",
  },
];

const SidebarContainer = styled.div`
  min-height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #181818;
  color: #e5e5e5;

  ::-webkit-scrollbar {
    width: 0;
    display: none; 
  }

  position: relative;

  .Sidebarbutton {
    position: absolute;
    top: 42px;

    width: 32px;
    height: 32px;

    border-radius: 99px;
    background: #252525;

    box-shadow: 0 0 10px 2px #252525;
    
    /* Centrar el icono */
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: transform 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    right: ${({ isOpen }) => (isOpen ? `16px` : `32px`)};
    border: none;

    svg {
      color: ${({ isOpen }) => (isOpen ? `#fff` : `#00D8FF`)};
      font-size: 18px;
    }
  }

  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;

    img {
      transition: transform 0.4s linear ease-in;
      transform: ${({ isOpen }) => (isOpen ? `scale(1.2)` : `scale(0)`)};
    }

    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      margin-left: 14px;
    }
  }

  .LinkContainer {
    margin: 10px 0;
    display: flex;
    justify-content: center;

    &:hover {
      background: #252525;
    }

    .Links {
      display: flex;
      align-items: center;

      padding: 15px 0;
      color: #e5e5e5;
      
      text-decoration: none;
      width: ${({ isOpen }) => (isOpen ? `160px` : `auto`)};

      .icon {
        svg {
          font-size: 28px;
        }
      }

      span {
        margin-left: 14px;
        display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      }

      &.active {
        color: #00D8FF;
      }
    }
  }
`;
