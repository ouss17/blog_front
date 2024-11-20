import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
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
