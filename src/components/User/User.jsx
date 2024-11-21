import useModal from "@/lib/useModal";
import { addUser } from "@/reducers/user";
import stylesAccueil from "@/styles/Accueil.module.css";
import styles from "@/styles/User.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SadCry } from "../../../public/ressources/svgs";
import Article from "../Article/Article";
import FormUser from "../Forms/FormUser";
import Modal from "../Modal/Modal";
const User = () => {
  const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
  const [action, setAction] = useState("");

  useEffect(() => {
    if (action !== "") {
      dragDown();
    }
  }, [action]);

  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  const [userData, setUserData] = useState({});

  const [articles, setArticles] = useState([]);
  useEffect(() => {
    console.log(user);
    if (user.role === "") {
      router.push("/account/login");
    } else {
      fetch(`http://localhost:3000/users/getMe`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setUserData(data.data);
          }
        });
    }
  }, [user]);

  const allArticles = useSelector((state) => state.articles.value);

  useEffect(() => {
    if (user.role !== "") {
      fetch(`http://localhost:3000/articles/articlesByUser/${user.id}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result) {
            setArticles(data.data);
          }
        });
    }
  }, [allArticles, user]);

  const [displayArticles, setDisplayArticles] = useState([]);
  useEffect(() => {
    if (articles.length > 0) {
      setDisplayArticles(
        articles.map((article, i) => <Article key={i} article={article} />)
      );
    }
  }, [articles]);

  const {
    register: register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const handleLogin = (data) => {
    if (action == "edit") {
      fetch("http://localhost:3000/users/updateUser", {
        credentials: "include",
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((datas) => {
          if (datas.result) {
            setErrorMsg("");
            toast.success("Utilisateur modifié");
            reset();
            setAction("");
            dispatch(addUser(datas.data));
            dragUp();
          } else {
            toast.error(datas.error);
            setErrorMsg(datas.error);
          }
        });
    } else {
      console.log(data);
      if (data.newPassword == data.confirmPassword) {
        setErrorMsg("");
        fetch("http://localhost:3000/users/updatePassword", {
          credentials: "include",
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((datas) => {
            if (datas.result) {
              setErrorMsg("");
              toast.success("Mot de passe modifié");
              reset();
              setAction("");
              dragUp();
            } else {
              toast.error(datas.error);
              setErrorMsg(datas.error);
            }
          });
      } else {
        setErrorMsg("Les 2 mots de passe ne sont pas similaire !");
      }
    }
  };

  return (
    user.role !== "" && (
      <>
        <Modal
          titleModal={
            action == "edit"
              ? "Modifiez vos informations"
              : "Modifiez votre mot de passe"
          }
          isShowing={isShowing}
          showGreen={true}
          showRed={true}
          hide={dragUp}
          topModal={topModal}
          opacityOverlay={opacityOverlay}
          actionClose={"Annuler"}
          actionValid={"Ajouter"}
          handleSubmit={handleSubmit}
          functionToDo={handleLogin}
          setAction={setAction}
          errorMsg={errorMsg}
        >
          <FormUser
            action={action}
            register={register}
            errors={errors}
            user={userData}
          />
        </Modal>
        <div className={styles.userHeader}>
          <div className={styles.userInfo}>
            <p className={styles.username}>{userData.username}</p>
            <p className={styles.userEmail}>{userData.email}</p>
            <p className={styles.userBirthDate}>
              {new Date(userData.birthDate).getDate()}
              {"-"}
              {new Date(userData.birthDate).getMonth()}
              {"-"}
              {new Date(userData.birthDate).getFullYear()}
            </p>
          </div>
          <div className={styles.userActions}>
            <button
              className={`${styles.button}`}
              onClick={() => setAction("edit")}
            >
              Éditer le profil
            </button>
            <button
              className={`${styles.button}`}
              onClick={() => setAction("editPassword")}
            >
              Modifier le mot de passe
            </button>
          </div>
        </div>
        {articles.length > 0 ? (
          <div className={stylesAccueil.articlesContainer}>
            {displayArticles}
          </div>
        ) : (
          <p className={stylesAccueil.noPost}>
            Aucun post disponible{" "}
            <span>
              <SadCry />
            </span>
          </p>
        )}
      </>
    )
  );
};

export default User;
