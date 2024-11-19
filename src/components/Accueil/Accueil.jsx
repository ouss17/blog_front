import React, { useContext } from "react";
import styles from "@/styles/Accueil.module.css";
import darkmodeContext from "@/context/darkmodeContext";
import { Plume } from "../../../public/ressources/svgs";
const Accueil = () => {
  return (
    <>
      <button className={styles.newPost}>
        <Plume />
        <span>+</span>
      </button>
    </>
  );
};

export default Accueil;
