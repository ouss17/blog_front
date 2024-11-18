import React, { useContext, useState } from "react";
import styles from "@/styles/Footer.module.css";
import stylesDark from "@/styles/Darkmode.module.css";
import darkmodeContext from "@/context/darkmodeContext";
import { Moon, Sun } from "../../../public/ressources/svgs";
const Footer = () => {
  const [date, setDate] = useState(new Date());
  const { darkmode, setDarkmode } = useContext(darkmodeContext);

  return (
    <footer
      className={`
        ${styles.footer}
        ${darkmode ? stylesDark.darkmode : stylesDark.whitemode}`}
    >
      <p className={styles.copyrights}>
        © Copyright Ousmane {date.getFullYear()}
      </p>
      <span
        className={styles.toggleDark}
        onClick={() => setDarkmode((prev) => !prev)}
      >
        {darkmode ? <Sun /> : <Moon />}
      </span>
      <style jsx="true">
        {`
          html {
            background: ${darkmode ? "black" : "white"};
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
