import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: 'light', // 'light' or 'dark'
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;
