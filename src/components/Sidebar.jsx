import { NavLink } from "react-router-dom";
import {
  AiOutlineDeploymentUnit ,
  AiTwotoneBank,
  AiOutlineLeft,
  AiOutlineBranches, 
  AiOutlineDotChart, 
  AiOutlineLineChart,
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
      <div className="Logocontent">
        <img src={logo} />
        <h2>METODOS</h2>
        <button className="Sidebarbutton" onClick={ModSidebaropen}>
          <AiOutlineLeft />
        </button>
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
    icon: <AiOutlineCodeSandbox />,
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

  .Logocontent {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 0 1.25rem 0;

    img {
      width: 3rem;
      height: 3rem;
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
    }

    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      margin-left: 1.2rem;
      font-size: 1.5rem;
    }
  }

  .Sidebarbutton {
    width: 1.7rem;
    height: 1.7rem;
    margin-left: ${({ isOpen }) => (isOpen ? `0.6rem` : `0`)};

    border-radius: 50%;
    background: #303030;

    box-shadow: 0 0 0.625rem 0.125rem #252525;
    
    /* Centrar el icono */
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: transform 0.3s linear;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;

    svg {
      color: ${({ isOpen }) => (isOpen ? `#fff` : `#00D8FF`)};
      font-size: 1.125rem;
    }
  }

  .LinkContainer {
    margin: 0.625rem 0;
    display: flex;
    justify-content: center;

    &:hover {
      background: #252525;
    }

    .Links {
      display: flex;
      align-items: center;

      padding: 0.9375rem 0;
      color: #e5e5e5;
      
      text-decoration: none;
      width: ${({ isOpen }) => (isOpen ? `10rem` : `auto`)};

      .icon {
        svg {
          font-size: 1.75rem;
        }
      }

      span {
        font-size: 1rem;
        margin-left: 0.875rem;
        display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      }

      &.active {
        color: #00D8FF;
      }
    }
  }
`;
