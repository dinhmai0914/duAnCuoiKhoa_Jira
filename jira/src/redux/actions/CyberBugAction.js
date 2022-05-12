import { validateYupSchema } from "formik";
import { USER_SIGNIN_API, USER_SIGNUP_API } from "../constant/CyberBugs";

export const signinCyberbugAction = (email, passWord) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      passWord: passWord,
    },
  };
};

export const signUpCyberbugAction = (email, passWord, name, phoneNumber) => {
  return {
    type: USER_SIGNUP_API,
    userSignUp: {
      email: email,
      passWord: passWord,
      name: name,
      phoneNumber: phoneNumber,
    },
  };
};
