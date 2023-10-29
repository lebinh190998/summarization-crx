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
    summarization: {
      original: '',
      summarized: '',
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
    setSummarization: (
      state: State,
      action: {
        type: string;
        payload: { original: string; summarized: string };
      }
    ) => {
      state.summarization = action.payload;
    },
  },
});

export const { setLanguage, setTranslateTerm, setSummarization } =
  popupSlice.actions;

export default popupSlice.reducer;
