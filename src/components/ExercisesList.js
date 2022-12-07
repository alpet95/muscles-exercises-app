import React from "react";
import { useSelector } from "react-redux";
import ExerciseItem from "./ExerciseItem";

import styles from "./ExercisesList.module.css";

const ExercisesList = () => {
  const exercises = useSelector((state) => state.muscles.exercises);

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </ul>
    </div>
  );
};

export default ExercisesList;
