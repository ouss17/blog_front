import darkmodeContext from "@/context/darkmodeContext";
import pageContext from "@/context/pageContext";
import { removeUser } from "@/reducers/user";
import stylesDark from "@/styles/Darkmode.module.css";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
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
