import React from "react";
import styles from "./Login.module.css"
import { reduxForm, Field } from "redux-form";

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      <div className={styles.itemFormContainer}>
        <Field placeholder={"Login"} name={"login"} component={"input"} className="form-control" />
      </div>
      <div className={styles.itemFormContainer}>
        <Field placeholder={"Password"} name={"password"} component={"input"} className="form-control" />
      </div>
      <div className={styles.itemFormContainer}>
        <Field component={"input"} name={"rememberMe"} type={"checkbox"} /> Remember me
      </div>
      <div className={styles.itemFormContainer}>
        <button className=" btn-primary">Sign in</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
   // a unique name for the form
   form: "login"
})(LoginForm);

const Login = props => {     // TODO
   const onSubmit = (formData) => {      // TODO
   console.log("Login -> onSubmit -> formData", formData);


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
