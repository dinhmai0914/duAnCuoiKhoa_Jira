import { validateYupSchema } from "formik";
import { USER_SIGNIN_API } from "../constant/CyberBugs";

export const signinCyberbugAction = (email, passWord) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      passWord: passWord,
    },
  };
};
