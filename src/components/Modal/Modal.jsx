import React, { useContext, useState } from 'react'
import { createPortal } from "react-dom";
import styles from "@/styles/Modal.module.css"
import stylesDark from "@/styles/Darkmode.module.css"
import { Cross } from '../../../public/ressources/svgs';
import darkmodeContext from '@/context/darkmodeContext';

const Modal = ({ isShowing, hide, showGreen, showRed, titleModal, actionClose, actionValid, functionToDo, topModal, opacityOverlay, children }) => {
    const { darkmode, setDarkmode } = useContext(darkmodeContext)
    const handleSubmit = (e, param) => {
        e.preventDefault();
        func(param);
        // console.log(formDatas);
        // console.log("rendu");
    };
    return isShowing && createPortal(
        <div className={styles.overlay} style={{ opacity: `${opacityOverlay}` }}>
            <div className={styles.modalWrapper} style={{ top: `${topModal}%` }}>

                <div className={`${styles.modal} ${darkmode ? stylesDark.darkmode : stylesDark.whitemode}`}>
                    <div style={{ position: "relative", left: "8%" }}>
                        <span className={styles.crossModal} onClick={hide}>
                            <Cross />
                        </span>
                    </div>
                    <h3 className={styles.titleModal}>{titleModal}</h3>
                    <form className={styles.formModal}>
                        {children}
                        <div className={styles.modalAction}>
                            {
                                showRed &&
                                <button type='button' onClick={hide} className={`${styles.actionClose} ${styles.buttonModal}`}>{actionClose}</button>
                            }
                            {
                                showGreen &&
                                <button className={`${styles.actionValid} ${styles.buttonModal}`}>{actionValid}</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>, document.body
    )
}

export default Modal