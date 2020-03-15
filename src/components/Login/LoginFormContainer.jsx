import React from "react";
import styles from "./Login.module.css";
import formControlStyles from "./../common/FormsControls/FormsControls.module.css";
import { reduxForm } from "redux-form";
// import { reduxForm } from 'redux-form/immutable'
import { Input } from "./../common/FormsControls/FormsControls";
import {
  required,
  maxLengthCreator
} from "./../../utils/validators/validators";
import {createField} from "./../../components/common/FormsControls/FormsControls";

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({ handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      {createField(
        styles.itemFormContainer,
        [required, maxLength30],
        "Email",
        "email",
        Input,
        "form-control"
      )}

      {createField(
        styles.itemFormContainer,
        [required, maxLength30],
        "Password",
        "password",
        Input,
        "form-control",
        { type: "password" }
      )}
      {createField(
        styles.itemFormContainer,
        [],
        null,
        "rememberMe",
        Input,
        null,
        { type: "checkbox" },
        "Remember me"
      )}
      {error && (
        <div className={formControlStyles.formSummaryError}>{error}</div>
      )}
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

export default LoginReduxForm;
