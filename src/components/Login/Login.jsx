import React from "react";
import styles from "./Login.module.css"
import { reduxForm, Field } from "redux-form";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      <div className={styles.itemFormContainer}>
        <Field placeholder={"Login"} name={"login"} component={"input"} />
      </div>
      <div className={styles.itemFormContainer}>
        <Field placeholder={"Password"} name={"password"} component={"input"} />
      </div>
      <div className={styles.itemFormContainer}>
        <Field component={"input"} name={"rememberMe"} type={"checkbox"} /> Remember me
      </div>
      <div className={styles.itemFormContainer}>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
   // a unique name for the form
   form: "login"
})(LoginForm);

const Login = props => {
   const onSubmit = (formData) => {
   console.log("onSubmit -> formData", formData);


   }

   return (
     <div className={styles.loginFormWrapper}>
        <div className={styles.loginFormBorderHelper}> 
       <h1 className={styles.loginFormTitle}>Login</h1>
       <LoginReduxForm onSubmit={onSubmit} />
       </div>
     </div>
   );
 };

export default Login;
