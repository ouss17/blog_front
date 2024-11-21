import { getWithBdd } from "@/reducers/articles";
import styles from "@/styles/Accueil.module.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Plume, SadCry } from "../../../public/ressources/svgs";
import useModal from "../../lib/useModal";
import Article from "../Article/Article";
import FormArticle from "../Forms/FormArticle";
import Modal from "../Modal/Modal";
const Accueil = () => {
  const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
  const user = useSelector((state) => state.user.value);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();

  const [action, setAction] = useState("");

  useEffect(() => {
    if (action !== "") {
      dragDown();
    }
  }, [action]);

  useEffect(() => {
    fetch("http://localhost:3000/articles")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(getWithBdd(data.data));
      });
  }, []);
  const articles = useSelector((state) => state.articles.value);
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

  const handleLogin = (data) => {
    fetch("http://localhost:3000/articles", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.result) {
          setErrorMsg("");
          toast.success("Article Posté");
          reset();
          setAction("");
          dragUp();
          dispatch(getWithBdd(datas.data));
        } else {
          toast.error(datas.error);
          setErrorMsg(datas.error);
        }
      });
  };
  return (
    <>
      <Modal
        titleModal={"Dites ce que vous voulez"}
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
      >
        <FormArticle action={action} register={register} errors={errors} />
      </Modal>
      {articles.length > 0 ? (
        <div className={styles.articlesContainer}>{displayArticles}</div>
      ) : (
        <p className={styles.noPost}>
          Aucun post disponible{" "}
          <span>
            <SadCry />
          </span>
        </p>
      )}
      {user.role !== "" && (
        <button onClick={() => setAction("post")} className={styles.newPost}>
          <Plume />
          <span>+</span>
        </button>
      )}
    </>
  );
};

export default Accueil;
