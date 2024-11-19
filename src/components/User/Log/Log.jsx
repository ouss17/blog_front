import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import stylesForm from "@/styles/Form.module.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "@/reducers/user";
import { useRouter } from "next/router";
import darkmodeContext from "@/context/darkmodeContext";

const Log = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const { darkmode, setDarkmode } = useContext(darkmodeContext);

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
    // reset: resetLoginForm,
  });

  const handleLogin = (data) => {
    fetch("http://localhost:3000/users/signin", {
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
          console.log(datas.data);
          dispatch(addUser(datas.data));
          // resetLoginForm();
          router.push("/");
        } else {
          toast.error("Invalid creadentials");
          setErrorMsg("Wrong username or password");
        }
      });
  };

  return (
    <>
      <div className="formLogin">
        <form onSubmit={handleSubmit(handleLogin)} className={stylesForm.form}>
          <label className={stylesForm.label} htmlFor="username">
            Nom d'utilisateur ou adresse email
          </label>
          <input
            className={stylesForm.input}
            type="text"
            name="username"
            id="username"
            placeholder="Johnny"
            {...register("username", {
              required: "Username or email is required",
            })}
          />
          {errors.username && (
            <span className={stylesForm.errorMsg}>
              {errors.username?.message}
            </span>
          )}
          <label className={stylesForm.label} htmlFor="password">
            Mot de passe
          </label>
          <input
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
                  "Password must contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special characyer",
              },
            })}
            className={stylesForm.input}
            type="password"
            name="password"
          />
          <span className={stylesForm.errorMsg}>
            {errors.password?.message}
          </span>
          {errorMsg.length > 0 && (
            <span className={stylesForm.errorMsg}>{errorMsg}</span>
          )}
          <button
            className={`${stylesForm.buttonForm} ${
              darkmode ? stylesForm["color-dark"] : stylesForm["color-white"]
            }`}
            id="connection"
          >
            Connect
          </button>
        </form>
        <p className={stylesForm.already}>
          Pas de compte ? Enregitrez-vous{" "}
          <Link className={`${stylesForm.a}`} href="/account/register">
            ici
          </Link>
        </p>
      </div>
    </>
  );
};

export default Log;
