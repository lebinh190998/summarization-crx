import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';
import { LANGUAGE_CODES } from '../constant';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    language: LANGUAGE_CODES.VIETNAMESE,
    translateTerm: {
      previous: '',
      current: '',
    },
  },
  reducers: {
    setLanguage: (state: State, action: { type: string; payload: string }) => {
      state.language = action.payload;
    },
    setTranslateTerm: (
      state: State,
      action: { type: string; payload: { previous: string; current: string } }
    ) => {
      state.translateTerm = action.payload;
    },
  },
});

export const { setLanguage, setTranslateTerm } = popupSlice.actions;

export default popupSlice.reducer;
