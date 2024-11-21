import darkmodeContext from "@/context/darkmodeContext";
import styles from "@/styles/Form.module.css";
import stylesForm from "@/styles/Modal.module.css";
import { useContext, useState } from "react";
import { Eye, EyeSlash } from "../../../public/ressources/svgs";

const FormUser = ({ action, register, errors, user }) => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);
  const [visibleLastPassword, setVisibleLastPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);

  return action == "edit" ? (
    user && (
      <>
        <label className={stylesForm.label}>Nom d'utilisateur</label>
        <input
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          type="text"
          name="username"
          className={stylesForm.formElem}
          {...register("username", {
            required: "Username required",
          })}
          defaultValue={user.username}
        />
        {errors.username && (
          <span className={stylesForm.errorMsg}>
            {errors.username?.message}
          </span>
        )}
        <label className={stylesForm.label}>Email</label>
        <input
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          className={`${stylesForm.formElem}`}
          defaultValue={user.email}
          name="email"
          {...register("email", {
            required: "Content required",
          })}
        />
        {errors.email && (
          <span className={stylesForm.errorMsg}>{errors.email?.message}</span>
        )}
        <label className={stylesForm.formElem}>Lien http de l'image</label>
        <input
          style={{
            background: darkmode ? "black" : "white",
            color: darkmode ? "white" : "black",
          }}
          type="date"
          defaultValue={new Date(user.birthDate).toISOString().substring(0, 10)}
          className={stylesForm.formElem}
          name="birthDate"
          {...register("birthDate")}
        />
      </>
    )
  ) : action == "editPassword" ? (
    user && (
      <>
        <label className={stylesForm.label}>Précédent mot de passe</label>
        <div className={styles.inputPassword}>
          <input
            style={{
              background: darkmode ? "black" : "white",
              color: darkmode ? "white" : "black",
            }}
            type={visibleLastPassword ? "text" : "password"}
            name="lastPassword"
            className={stylesForm.formElem}
            {...register("lastPassword", {
              required: "Password required",
            })}
          />
          <div
            className={styles.eye}
            onClick={() => setVisibleLastPassword((prev) => !prev)}
            style={{ right: "5%", top: "10%" }}
          >
            {!visibleLastPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        {errors.lastPassword && (
          <span className={stylesForm.errorMsg}>
            {errors.lastPassword?.message}
          </span>
        )}
        <label className={stylesForm.label}>Nouveau mot de passe</label>
        <div className={styles.inputPassword}>
          <input
            style={{
              background: darkmode ? "black" : "white",
              color: darkmode ? "white" : "black",
            }}
            type={visibleNewPassword ? "text" : "password"}
            className={`${stylesForm.formElem}`}
            name="newPassword"
            {...register("newPassword", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character",
              },
            })}
          />
          <div
            className={styles.eye}
            onClick={() => setVisibleNewPassword((prev) => !prev)}
            style={{ right: "5%", top: "10%" }}
          >
            {!visibleNewPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
        {errors.newPassword && (
          <span className={stylesForm.errorMsg}>
            {errors.newPassword?.message}
          </span>
        )}
        <label className={stylesForm.formElem}>Confirmez mot de passe</label>
        <div className={styles.inputPassword}>
          <input
            style={{
              background: darkmode ? "black" : "white",
              color: darkmode ? "white" : "black",
            }}
            type={visibleConfirmPassword ? "text" : "password"}
            className={stylesForm.formElem}
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Password required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character",
              },
            })}
          />
          <div
            className={styles.eye}
            style={{ right: "5%", top: "10%" }}
            onClick={() => setVisibleConfirmPassword((prev) => !prev)}
          >
            {!visibleConfirmPassword ? <Eye /> : <EyeSlash />}
          </div>
        </div>
      </>
    )
  ) : (
    <></>
  );
};

export default FormUser;
