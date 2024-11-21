import darkmodeContext from "@/context/darkmodeContext";
import stylesForm from "@/styles/Modal.module.css";
import { useContext } from "react";

const FormArticle = ({ action, register, errors, article }) => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);

  return action == "post" ? (
    <>
      <label className={stylesForm.label}>Titre</label>
      <input
        style={{
          background: darkmode ? "black" : "white",
          color: darkmode ? "white" : "black",
        }}
        type="text"
        name="title"
        className={stylesForm.formElem}
        {...register("title", {
          required: "Title required",
        })}
      />
      {errors.title && (
        <span className={stylesForm.errorMsg}>{errors.title?.message}</span>
      )}
      <label className={stylesForm.label}>Contenu</label>
      <textarea
        style={{
          background: darkmode ? "black" : "white",
          color: darkmode ? "white" : "black",
        }}
        className={`${stylesForm.formElem} ${stylesForm.textarea}`}
        name="content"
        {...register("content", {
          required: "Content required",
        })}
      ></textarea>
      {errors.content && (
        <span className={stylesForm.errorMsg}>{errors.content?.message}</span>
      )}
      <label className={stylesForm.formElem}>Lien http de l'image</label>
      <input
        style={{
          background: darkmode ? "black" : "white",
          color: darkmode ? "white" : "black",
        }}
        type="text"
        className={stylesForm.formElem}
        name="imgArticle"
        {...register("imgArticle")}
      />
    </>
  ) : action == "edit" ? (
    article && (
      <>
        <label className={stylesForm.label}>Titre</label>
        <input
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          type="text"
          name="title"
          className={stylesForm.formElem}
          {...register("title", {
            required: "Title required",
          })}
          defaultValue={article.title}
        />
        {errors.title && (
          <span className={stylesForm.errorMsg}>{errors.title?.message}</span>
        )}
        <label className={stylesForm.label}>Contenu</label>
        <textarea
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          className={`${stylesForm.formElem} ${stylesForm.textarea}`}
          defaultValue={article.content}
          name="content"
          {...register("content", {
            required: "Content required",
          })}
        ></textarea>
        {errors.content && (
          <span className={stylesForm.errorMsg}>{errors.content?.message}</span>
        )}
        <label className={stylesForm.formElem}>Lien http de l'image</label>
        <input
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          type="text"
          defaultValue={article.imgArticle}
          className={stylesForm.formElem}
          name="imgArticle"
          {...register("imgArticle")}
        />
      </>
    )
  ) : (
    <></>
  );
};

export default FormArticle;
