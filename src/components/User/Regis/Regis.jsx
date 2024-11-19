import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "@/reducers/user";

import stylesForm from "@/styles/Form.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import darkmodeContext from "@/context/darkmodeContext";
import { Eye, EyeSlash } from "../../../../public/ressources/svgs";

const Regis = () => {
  const { darkmode, setDarkmode } = useContext(darkmodeContext);

  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    // console.log(user);
    if (user.role !== "") {
      router.push("/");
    }
  }, []);

  const {
    register: register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    // reset: resetRegisterForm,
  });

  const handleRegister = (data) => {
    fetch("http://localhost:3000/users/signup", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((datas) => {
        if (datas.result) {
          setErrorMsg("");
          toast.success("User successfully connected");
          dispatch(addUser(datas.data));
          // resetRegisterForm();
          router.push("/");
        } else {
          toast.error("Invalid creadentials");
          setErrorMsg("Wrong username or password");
        }
      });
  };
  const [visiblePassword, setVisiblePassword] = useState(false)

  return (
    <>
      <div className="formLogin">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className={stylesForm.form}
        >
          <label className={stylesForm.label} htmlFor="username">
            Nom d'utilisateur ou adresse email
          </label>
          <input
            style={{ background: darkmode ? "black" : "white", color: darkmode ? "white" : "black" }}
            className={stylesForm.input}
            type="text"
            name="username"
            id="username"
            placeholder="Johnny"
            {...register("username", {
              required: "Username is required",
            })}
          />
          {errors.username && (
            <span className={stylesForm.errorMsg}>
              {errors.username?.message}
            </span>
          )}
          <label className={stylesForm.label} htmlFor="email">
            Adresse Email
          </label>
          <input
            style={{ background: darkmode ? "black" : "white", color: darkmode ? "white" : "black" }}
            className={stylesForm.input}
            type="text"
            name="email"
            placeholder="jhonDoe@gmail.com"
            {...register("email", {
              required: "Email is required",
              minLength: {
                value: 8,
                message: "Email must have at least 8 characters",
              },
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Email must be valid",
              },
            })}
          />
          {errors.email && (
            <span className={stylesForm.errorMsg}>{errors.email?.message}</span>
          )}
          <label className={stylesForm.label} htmlFor="password">
            Mot de passe
          </label>
          <div className={stylesForm.inputPassword}>

            <input
              style={{ background: darkmode ? "black" : "white", color: darkmode ? "white" : "black" }}
              className={stylesForm.input}
              type={visiblePassword ? "text" : "password"}
              name="password"
              {...register("password", {
                required: "Password is required",
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
            <div className={stylesForm.eye} onClick={() => setVisiblePassword(prev => !prev)}>
              {!visiblePassword ? <Eye /> : <EyeSlash />}
            </div>
          </div>
          <span className={stylesForm.errorMsg}>
            {errors.password?.message}
          </span>

          <label className={stylesForm.label} htmlFor="birthDate">
            Date de naissance
          </label>
          <input
            type="date"
            className={stylesForm.inputDate}
            name="birthDate"
            {...register("birthDate", {
              required: "birthDate is required",
            })}
          />
          <span className={stylesForm.errorMsg}>
            {errors.birthDate?.message}
          </span>
          {errorMsg.length > 0 && (
            <span className={stylesForm.errorMsg}>{errorMsg}</span>
          )}
          <button
            className={`${stylesForm.buttonForm} ${darkmode ? stylesForm["color-dark"] : stylesForm["color-white"]
              }`}
          >
            S'enregistrer
          </button>
        </form>
        <p className={stylesForm.already}>
          Déja un compte ? Connectez-vous{" "}
          <Link className={stylesForm.a} href="/account/login">
            ici
          </Link>
        </p>
      </div>
    </>
  );
};

export default Regis;
