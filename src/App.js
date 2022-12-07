import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { musclesActions } from "./app/store";
import { getMusclesNames, getExercisesInfo } from "./app/api";

import ExercisesList from "./components/ExercisesList";
import MuscleSelect from "./components/MuscleSelect";

import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  const musclesNamesReq = useCallback(async () => {
    try {
      const data = await getMusclesNames();
      dispatch(musclesActions.getNames(data));
    } catch (error) {}
  }, [dispatch]);

  const exercisesInfoReq = useCallback(
    async (query) => {
      try {
        const data = await getExercisesInfo(query);
        dispatch(musclesActions.getExercises(data));
      } catch (error) {}
    },
    [dispatch]
  );

  useEffect(() => {
    musclesNamesReq();
  }, [musclesNamesReq]);

  return (
    <div className={styles.app}>
      <MuscleSelect onSelectSubmitHandler={exercisesInfoReq} />
      <ExercisesList />
    </div>
  );
}

export default App;
