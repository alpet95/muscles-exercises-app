import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { musclesActions } from "../app/store";
import styles from "./MuscleSelect.module.css";

const MuscleSelect = (props) => {
  const dispatch = useDispatch();

  const selected = useSelector((state) => state.muscles.selected);
  const names = useSelector((state) => state.muscles.names);

  const selectSubmitHandler = (e) => {
    dispatch(musclesActions.setQuery(e.target.value));
    props.onSelectSubmitHandler(e.target.value);
  };

  return (
    <div>
      <select
        name="muscles"
        className={styles.select}
        onChange={selectSubmitHandler}
        value={selected}
      >
        <option disabled={true} value="">
          --TYPES OF MUSCLE--
        </option>
        {names.map((name) => (
          <option key={name.id} value={name.id}>
            {name.name.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MuscleSelect;
