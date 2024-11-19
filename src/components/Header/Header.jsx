import React, { useContext } from "react";
import styles from "@/styles/Header.module.css";
import darkmodeContext from "@/context/darkmodeContext";
import stylesDark from "@/styles/Darkmode.module.css";
import pageContext from "@/context/pageContext";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "@/reducers/user";
const Header = () => {
  const dispatch = useDispatch();
  const disconnect = () => {
    dispatch(removeUser());
    fetch("http://localhost:3000/users/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  const { darkmode, setDarkmode } = useContext(darkmodeContext);
  const { page, setPage } = useContext(pageContext);
  const user = useSelector((state) => state.user.value);
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
            <Link href="/">Accueil</Link>
          </li>
          <li
            className={styles.elementNav}
            style={{
              fontWeight: page.includes("/account") ? "bold" : "normal",
            }}
          >
            <Link href="/account">Mon compte</Link>
          </li>
        </ul>
      </nav>
      {user.role !== "" && (
        <div className={styles.welcome}>
          <p>Yo {user.username}</p>
          <p className={styles.logout} onClick={disconnect}>
            Déconnexion
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
