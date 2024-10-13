import styled from "styled-components";
import logo from "../assets/react.svg";
import { AiOutlineLeft, AiOutlineHome, AiOutlineApartment } from "react-icons/ai";
import { MdOutlineAnalytics } from "react-icons/md";
import { NavLink } from "react-router-dom";

export function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const ModSidebaropen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Container isOpen={sidebarOpen}>
      <button className="Sidebarbutton" onClick={ModSidebaropen}>
        <AiOutlineLeft />
      </button>
      <div className="Logocontent">
        <div className="imgcontent">
          <img src={logo} />
        </div>
        <h2>METODOS</h2>
      </div>
      {linksArray.map(({ icon, label, to }) => (
        <div className="LinkContainer" key={label}>
          <NavLink
            to={to}
            className={({ isActive }) => `Links${isActive ? ` active` : ``}`}
          >
            <div className="Linkicon">{icon}</div>
            {sidebarOpen && <span>{label}</span>}
          </NavLink>
        </div>
      ))}
    </Container>
  );
}

const linksArray = [
  {
    label: "Home",
    icon: <AiOutlineHome />,
    to: "/home",
  },
  {
    label: "CPM",
    icon: <AiOutlineApartment />,
    to: "/CPM",
  },
  {
    label: "PERT",
    icon: <MdOutlineAnalytics />,
    to: "/PERT",
  },
  {
    label: "EOQ",
    icon: <MdOutlineAnalytics />,
    to: "/EOQ",
  },
  {
    label: "Decisiones",
    icon: <MdOutlineAnalytics />,
    to: "/Decisiones",
  },
];

const Container = styled.div`
  color: #f1f1f1;
  background: #111;
  position: sticky;
  height: 100vh;
  padding-top: 20px;

  .Sidebarbutton {
    position: absolute;
    top: 20px;
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #222;
    box-shadow: 0 0 4px #444, 0 0 7px #111;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s;
    transform: ${({ isOpen }) => (isOpen ? `initial` : `rotate(180deg)`)};
    border: none;

    svg {
      color: #fff; /* Símbolo blanco */
      font-size: 18px;
    }
  }

  .Logocontent {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;

    .imgcontent {
      img {
        max-width: 100%;
        height: auto;
        transition: transform 0.5s;
        transform: ${({ isOpen }) => (isOpen ? `scale(1.2)` : `scale(1.4)`)};
      }
    }

    h2 {
      display: ${({ isOpen }) => (isOpen ? `block` : `none`)};
      margin-left: 20px;
    }
  }

  .LinkContainer {
    margin: 8px 0;
    padding: 0 15%;
    &:hover {
      background: #222;
    }

    .Links {
      display: flex;
      align-items: center;
      padding: 8px 0;
      color: inherit;
      text-decoration: none;
      height: 50px;

      .Linkicon {
        padding: 8px 16px;
        svg {
          font-size: 25px;
        }
      }

      &.active .Linkicon svg {
        color: #7b61ff; /* Morado para el ícono activo */
      }
    }
  }

  .Themecontent {
    display: flex;
    justify-content: space-between;

    .titletheme {
      padding: 10px;
      font-weight: 700;
      opacity: ${({ isOpen }) => (isOpen ? `1` : `0`)};
      transition: opacity 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;
