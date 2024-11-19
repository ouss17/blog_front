import React, { useContext, useEffect } from "react";
import styles from "@/styles/User.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
const User = () => {
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    console.log(user);
    if (user.role === "") {
      router.push("/account/login");
    }
  }, [user]);
  return <>User</>;
};

export default User;
