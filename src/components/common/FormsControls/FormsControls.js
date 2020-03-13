import React from "react";
import styles from "./FormsControls.module.css";
import {Field} from "redux-form";

export const TextArea = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props} ><textarea {...input} {...restProps} /> </FormControl>
}


export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}

const FormControl = ({ input, meta: {touched, error}, children }) => {  
    const hasError = touched && error;

    return (
        <div className={`${styles.formControl} + " " + ${hasError ? styles.error : ""}`} >
            <div>
                {children}
            </div>
            <div>
                {hasError && <span>{error}</span>}
            </div>
        </div>
    )
}

export const createField = (containerClassName, validators, placeholder, name, component, className, props = {}, text = "") => {

    return <div className={containerClassName}>
        <Field
            validate={validators}
            placeholder={placeholder || "empty placeholder"}
            name={name}
            component={component}
            className={className}
            {...props}
        /> {text}
    </div>
}

