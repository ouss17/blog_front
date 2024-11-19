import React, { useContext } from "react";
import styles from "@/styles/Accueil.module.css";
import stylesForm from "@/styles/Modal.module.css"
import darkmodeContext from "@/context/darkmodeContext";
import { Plume } from "../../../public/ressources/svgs";
import useModal from "../Modal/useModal";
import Modal from "../Modal/Modal";
const Accueil = () => {
  const { isShowing, dragDown, dragUp, topModal, opacityOverlay } = useModal();
  const { darkmode, setDarkmode } = useContext(darkmodeContext)
  const showModalPost = () => {
    dragDown()
  }
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
        functionToDo={() => {
          saveContent(even);
        }}
      >
        <label className={stylesForm.label}>Titre</label>
        <input style={{ background: darkmode ? "black" : "white" }} type="text" name="title" className={stylesForm.formElem} />
        <label className={stylesForm.label}>Contenu</label>
        <textarea style={{ background: darkmode ? "black" : "white" }} className={`${stylesForm.formElem} ${stylesForm.textarea}`} name="content"></textarea>
        <label className={stylesForm.formElem}>Image</label>
        <input style={{ background: darkmode ? "black" : "white" }} type="file" className={stylesForm.formElem} name="imgArticle" />
      </Modal>
      <button onClick={showModalPost} className={styles.newPost}>
        <Plume />
        <span>+</span>
      </button>
    </>
  );
};

export default Accueil;
