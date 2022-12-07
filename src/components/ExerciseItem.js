import React from "react";
import { useSelector } from "react-redux";

import parse from "html-react-parser";
import DOMPurify from "dompurify";

import styles from "./ExerciseItem.module.css";

const ExerciseItem = (props) => {
  const { exercise } = props;
  const names = useSelector((state) => state.muscles.names);

  const name = DOMPurify.sanitize(exercise.name, {
    USE_PROFILES: { html: true },
  });

  const description = DOMPurify.sanitize(exercise.description, {
    USE_PROFILES: { html: true },
  });

  const musclesOther = exercise.musclesOther
    .map((num) => names.find((muscle) => muscle.id === num))
    .map((el) => el.name);

  return (
    <li className={styles.container}>
      <div className={styles.name}>{parse(name)}</div>
      <div className={styles.description}>{parse(description)}</div>
      {musclesOther.length === 0 || !musclesOther ? null : (
        <p className={styles.misc}>
          <b>Also trains:</b> {" " + musclesOther.join(", ")}
        </p>
      )}
    </li>
  );
};

export default ExerciseItem;
