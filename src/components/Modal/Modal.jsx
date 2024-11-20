import darkmodeContext from "@/context/darkmodeContext";
import stylesDark from "@/styles/Darkmode.module.css";
import styles from "@/styles/Modal.module.css";
import { useContext } from "react";
import { createPortal } from "react-dom";
import { Cross } from "../../../public/ressources/svgs";

const Modal = ({
  isShowing,
  hide,
  showGreen,
  showRed,
  titleModal,
  actionClose,
  actionValid,
  handleSubmit,
  functionToDo,
  topModal,
  opacityOverlay,
  setAction,
  children,
}) => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);
  const closeModal = () => {
    hide();
    setAction("");
  };
  return (
    isShowing &&
    createPortal(
      <div className={styles.overlay} style={{ opacity: `${opacityOverlay}` }}>
        <div className={styles.modalWrapper} style={{ top: `${topModal}%` }}>
          <div
            className={`${styles.modal} ${
              darkmode ? stylesDark.darkmode : stylesDark.whitemode
            }`}
          >
            <div style={{ position: "relative", left: "8%" }}>
              <span className={styles.crossModal} onClick={closeModal}>
                <Cross />
              </span>
            </div>
            <h3 className={styles.titleModal}>{titleModal}</h3>
            <form
              onSubmit={handleSubmit(functionToDo)}
              className={styles.formModal}
            >
              {children}
              <div className={styles.modalAction}>
                {showRed && (
                  <button
                    type="button"
                    onClick={closeModal}
                    className={`${styles.actionClose} ${styles.buttonModal}`}
                  >
                    {actionClose}
                  </button>
                )}
                {showGreen && (
                  <button
                    className={`${styles.actionValid} ${styles.buttonModal}`}
                  >
                    {actionValid}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
