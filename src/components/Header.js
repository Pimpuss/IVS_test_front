import React from "react";
import "./styles/Header.css";
import Logo from "../assets/logo.png";

function Header() {
  return (
    <header>
      <div className="logoContainer">
        <img src={Logo} alt="Logo IVS" />
      </div>
      <div className="linkContainer">
        <a
          className="navLink"
          href="http://www.intelligent-video-software.com/"
        >
          Accueil
        </a>
        <a
          className="navLink"
          href="http://www.intelligent-video-software.com/expertise/"
        >
          Expertise
        </a>
        <a
          className="navLink"
          data-route="solution"
          href="http://www.intelligent-video-software.com/solution/"
        >
          Solutions
        </a>
        <a
          className="navLink"
          data-route="equipe"
          href="http://www.intelligent-video-software.com/equipe/"
        >
          L'équipe
        </a>
        <a
          className="navLink"
          data-route="ivs"
          href="http://www.intelligent-video-software.com/ivs/"
        >
          IVS
        </a>
        <a
          className="navLink"
          href="mailto:recrutement@intelligent-video-software.com?subject=IVS - Candidature depuis le site IVS"
        >
          Jobs
        </a>
        <a
          className="navLink"
          href="mailto:contact@intelligent-video-software.com?subject=IVS - Contact depuis le site IVS"
        >
          Contact
        </a>
      </div>
    </header>
  );
}

export default Header;
