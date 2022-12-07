import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  names: [],
  exercises: [],
  selected: "",
};

const musclesSlice = createSlice({
  name: "muscles",
  initialState,
  reducers: {
    getNames(state, action) {
      state.names = action.payload;
    },
    getExercises(state, action) {
      state.exercises = action.payload;
    },
    setQuery(state, action) {
      state.selected = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    muscles: musclesSlice.reducer,
  },
});

export default store;
export const musclesActions = musclesSlice.actions;
