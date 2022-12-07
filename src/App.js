import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { musclesActions } from "./app/store";
import { getMusclesNames, getExercisesInfo } from "./app/api";

import ExercisesList from "./components/ExercisesList";
import MuscleSelect from "./components/MuscleSelect";

import Loading from "./common/Loading";
import Error from "./common/Error";
import StartPage from "./common/StartPage";

import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  const names = useSelector((state) => state.muscles.names);
  const exercises = useSelector((state) => state.muscles.exercises);
  const status = useSelector((state) => state.muscles.status);
  const error = useSelector((state) => state.muscles.error);

  const musclesNamesReq = useCallback(async () => {
    dispatch(musclesActions.setStatus("pending"));
    try {
      const data = await getMusclesNames();
      dispatch(musclesActions.getNames(data));
      dispatch(musclesActions.setStatus("completed"));
    } catch (error) {
      dispatch(musclesActions.setStatus("completed"));
      dispatch(
        musclesActions.setError(
          "Failed to load muscle names data from the server"
        )
      );
    }
  }, [dispatch]);

  const exercisesInfoReq = useCallback(
    async (query) => {
      dispatch(musclesActions.setStatus("pending"));
      try {
        const data = await getExercisesInfo(query);
        dispatch(musclesActions.getExercises(data));
        dispatch(musclesActions.setStatus("completed"));
      } catch (error) {
        dispatch(musclesActions.setStatus("completed"));
        dispatch(
          musclesActions.setError(
            "Failed to load exercises data from the server"
          )
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    musclesNamesReq();
  }, [musclesNamesReq]);

  const MAIN_CONTENT =
    status === "completed" && exercises.length > 0 ? (
      <>
        <MuscleSelect onSelectSubmitHandler={exercisesInfoReq} />
        <ExercisesList />
      </>
    ) : status === "completed" && names.length > 0 ? (
      <>
        <MuscleSelect onSelectSubmitHandler={exercisesInfoReq} />
        <StartPage />
      </>
    ) : (
      <Error />
    );

  return (
    <div className={styles.app}>
      {status === "pending" ? (
        <Loading />
      ) : status === "completed" && error ? (
        <Error />
      ) : (
        MAIN_CONTENT
      )}
    </div>
  );
}

export default App;
