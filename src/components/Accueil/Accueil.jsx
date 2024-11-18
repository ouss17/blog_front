import React, { useContext } from "react";
import styles from "@/styles/Accueil.module.css";
import stylesDark from "@/styles/Darkmode.module.css";
import darkmodeContext from "@/context/darkmodeContext";
const Accueil = () => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);
  return (
    <main
      className={`
    ${styles.main}
    ${darkmode ? stylesDark.darkmode : stylesDark.whitemode}`}
    ></main>
  );
};

export default Accueil;
