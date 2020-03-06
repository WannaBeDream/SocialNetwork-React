import React from "react";
import styles from "./Login.module.css"
import LoginReduxForm from "./LoginFormContainer";

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
