import React from "react";
import styles from "./Login.module.css";
import formControlStyles from "./../common/FormsControls/FormsControls.module.css";
import { reduxForm, Field } from "redux-form";
import { Input } from "./../common/FormsControls/FormsControls";
import {
  required,
  maxLengthCreator
} from "./../../utils/validators/validators";

const maxLength30 = maxLengthCreator(30);

const LoginForm = props => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      <div className={styles.itemFormContainer}>
        <Field
          validate={[required, maxLength30]}
          placeholder={"Email"}
          name={"email"}
          component={Input}
          className="form-control"
        />
      </div>
      <div className={styles.itemFormContainer}>
        <Field
          validate={[required, maxLength30]}
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          component={Input}
          className="form-control"
        />
      </div>
      <div className={styles.itemFormContainer}>
        <Field
          component={Input}
          name={"rememberMe"}
          type={"checkbox"}
        />{" "}
        Remember me
      </div>
     {props.error && <div className={formControlStyles.formSummaryError}>
       {props.error}
     </div>}
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
