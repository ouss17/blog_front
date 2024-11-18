import React, { useContext } from "react";
import styles from "@/styles/Header.module.css";
import darkmodeContext from "@/context/darkmodeContext";
import stylesDark from "@/styles/Darkmode.module.css";
import pageContext from "@/context/pageContext";
const Header = () => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);
  const { page, setPage } = useContext(pageContext);
  return (
    <header
      className={`
        ${styles.header}
        ${darkmode ? stylesDark.darkmode : stylesDark.whitemode}`}
    >
      <h1 className={styles.titleMain}>Le carnet des Mots</h1>
      <nav className={styles.navigation}>
        <ul className={styles.listNav}>
          <li
            className={styles.elementNav}
            style={{ fontWeight: page === "/" ? "bold" : "normal" }}
          >
            Accueil
          </li>
          <li
            className={styles.elementNav}
            style={{ fontWeight: page === "/account" ? "bold" : "normal" }}
          >
            Mon compte
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
