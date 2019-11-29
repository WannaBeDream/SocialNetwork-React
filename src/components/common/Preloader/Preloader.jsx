import React from "react";
import preloader from './../../../assets/images/220.gif';
import styles from './Preloader.module.css';

let Preloader = (props) => {
  return (
    <div>
      <img src={preloader} className={styles.preloader} alt="404" />
    </div>
  );
};


export default Preloader;