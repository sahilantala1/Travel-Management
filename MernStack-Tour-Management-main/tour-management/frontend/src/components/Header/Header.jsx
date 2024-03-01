import React from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const nav_links = [
  {
    path: "/home",
    display: "/Home",
  },
  {
    path: "#",
    display: "/About",
  },
  {
    path: "/tours",
    display: "/Tours",
  },
];

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between ">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink to={item.path}>{item.display}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav_btns  d-flex align-items-center gap-4">
                <button className="btn secondary__btn">
                  <Link to="/login">Login</Link>
                </button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
