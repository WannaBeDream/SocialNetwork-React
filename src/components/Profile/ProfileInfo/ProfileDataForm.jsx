import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import { Contact } from "./ProfileInfo";
import {
  createField,
  Input,
  TextArea
} from "./../../common/FormsControls/FormsControls";
import { reduxForm } from "redux-form";
import formControlStyles from "./../../common//FormsControls/FormsControls.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      {error && (
        <div className={formControlStyles.formSummaryError}>{error}</div>
      )}
      <div>
        <b> Full name:</b>{" "}
        {createField(null, [], "Full name", "fullName", Input, null)}
      </div>
      <div>
        <b> Looking for a job:</b>{" "}
        {createField(null, [], "", "lookingForAJob", Input, null, {
          type: "checkbox"
        })}
      </div>
      <div>
        <b> My professional skills:</b>
        {createField(
          null,
          [],
          "My professional skills",
          "lookingForAJobDescription",
          TextArea,
          null
        )}
      </div>
      <div>
        <b> About me:</b>
        {createField(null, [], "About me ", "aboutMe", TextArea, null)}
      </div>
      <div>
        {Object.keys(profile.contacts).map(key => {
          return (
            <div key={key} className={s.contact}>
              <b>{key}</b>:{" "}
              {createField(null, [], key, "contacts." + key, Input, null)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataReduxForm;
