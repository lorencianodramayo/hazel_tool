import { createSlice } from "@reduxjs/toolkit";

import { getLanguage, addLanguage } from "../../services/api/QATool/language";

const initialState = {
  data: [],
  fetching: false,
  error: null,
};

const language = createSlice({
  name: "language",
  initialState,
  reducers: {
    initLanguage: (state) => {
      state.fetching = true;
      state.error = null;
    },
    SuccessGetLanguage: (state, { payload }) => {
      state.fetching = false;
      state.data = payload;
    },
    SuccessAddLanguage: (state, { payload }) => {
      state.fetching = false;
      state.data = payload;
    },
    ErrorLanguage: (state, { payload }) => {
      state.fetching = false;
      state.error = payload;
    },
  },
});

export const { initLanguage, SuccessGetLanguage, SuccessAddLanguage, ErrorLanguage } = language.actions;

export const requestGetLanguage = () => async (dispatch) => {
  dispatch(initLanguage());

  const { status, data } = await getLanguage();

  if (status === 200) {
      dispatch(SuccessGetLanguage(data));
  }else{
      dispatch(ErrorLanguage("Couldn't get language'"));
  }
};

export const requestAddLanguage = (params) => async (dispatch) => {
  dispatch(initLanguage());
  const { status, data } = await addLanguage(params);

  if (status === 200) {
      dispatch(SuccessAddLanguage(data));
  }else{
      dispatch(ErrorLanguage("Couldn't add language'"));
  }
};

export default language.reducer;
