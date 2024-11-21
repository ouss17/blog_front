import useModal from "@/lib/useModal";
import { getWithBdd } from "@/reducers/articles";
import styles from "@/styles/Article.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "../../../public/ressources/svgs";
import FormArticle from "../Forms/FormArticle";
import Modal from "../Modal/Modal";
const Article = ({ article }) => {
  const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register: register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const [actionShow, setActionShow] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:3000/articles/${article._id}`, {
      credentials: "include",
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.result) {
          setErrorMsg("");
          toast.success("Article Supprimé");
          setAction("");
          dragUp();
          dispatch(getWithBdd(datas.data));
        } else {
          toast.error("Une erreur est survenue");
          setErrorMsg("Une erreur est survenue");
        }
      });
  };
  const handleEdit = (data) => {
    fetch(`http://localhost:3000/articles/${article._id}`, {
      credentials: "include",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.result) {
          setErrorMsg("");
          toast.success("Article Modifié");
          setAction("");
          reset();
          dragUp();
          dispatch(getWithBdd(datas.data));
        } else {
          toast.error(datas.error);
          setErrorMsg(datas.error);
        }
      });
  };
  const [date, setDate] = useState(new Date());

  const checkDifferencetime = (date2) => {
    const date3 = new Date(date2);

    return ((date - date3) / 3_600_000).toFixed(0);
  };
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    checkDifferencetime(article.creationDatetime);
  }, [date.getHours()]);

  const [action, setAction] = useState("");

  useEffect(() => {
    if (action !== "") {
      dragDown();
    }
  }, [action]);

  return (
    <>
      <Modal
        titleModal={
          action == "delete"
            ? "Êtes-vous sûr de vouloir supprimer ce post ?"
            : "Modifier ce post ?"
        }
        isShowing={isShowing}
        showGreen={true}
        showRed={true}
        hide={dragUp}
        topModal={topModal}
        opacityOverlay={opacityOverlay}
        actionClose={"Annuler"}
        actionValid={action == "delete" ? "Supprimer" : "Modifier"}
        handleSubmit={handleSubmit}
        functionToDo={action == "delete" ? handleDelete : handleEdit}
        setAction={setAction}
      >
        <FormArticle
          action={action}
          register={register}
          errors={errors}
          article={article}
        />
      </Modal>
      <div
        onMouseEnter={() => setActionShow(true)}
        onMouseLeave={() => setActionShow(false)}
        className={styles.article}
      >
        {user.id == article.userId._id && actionShow && (
          <div className={styles.actions}>
            <span
              onClick={() => setAction("edit")}
              className={`${styles.edit} ${styles.actionButton}`}
            >
              <Edit />
            </span>
            <span
              onClick={() => setAction("delete")}
              className={`${styles.delete} ${styles.actionButton}`}
            >
              <Delete />
            </span>
          </div>
        )}
        <div className={styles.headerArticle}>
          <div className={styles.dateArticle}>
            <p className={styles.dateArticleCreated}>
              {checkDifferencetime(article.creationDatetime) > 24
                ? article.creationDatetime
                : checkDifferencetime(article.creationDatetime) + "h"}
            </p>
            {article.updateDatetime && (
              <p className={styles.dateArticleUpdated}>
                Modifié{" "}
                {checkDifferencetime(article.updateDatetime) > 24
                  ? "le " + article.updateDatetime
                  : "il y a " +
                    checkDifferencetime(article.updateDatetime) +
                    "h"}
              </p>
            )}
          </div>
          <p className={styles.userArticle}>By {article.userId.username}</p>
        </div>
        <p className={styles.titleArticle}>{article.title}</p>
        <p className={styles.contentArticle}>{article.content}</p>
        {article.imgArticle && (
          <Image
            width={25}
            height={25}
            src={article.imgArticle}
            className={styles.imgArticle}
            alt={"image"}
          />
        )}
      </div>
    </>
  );
};

export default Article;
