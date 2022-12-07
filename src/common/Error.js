import React from "react";
import { useSelector } from "react-redux";
import styles from "./Error.module.css";

const Error = () => {
  const error = useSelector((state) => state.muscles.error);

  return (
    <div className={styles.container}>
      <p className={styles.error}>{error}</p>
    </div>
  );
};

export default Error;
