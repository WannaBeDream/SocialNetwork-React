import React from "react";
import styles from "./Login.module.css";
import LoginReduxForm from "./LoginFormContainer";
import { Redirect } from "react-router-dom";
import {connect} from "react-redux";
import {login} from "./../../myRedux/auth-reducer";

const Login = props => {
  // TODO
  const onSubmit = formData => {
    // TODO
    console.log("Login -> onSubmit -> formData", formData);
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if(props.isAuth) {
    return <Redirect to={"/profile"} />
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});


export default connect(mapStateToProps, {login})(Login);
