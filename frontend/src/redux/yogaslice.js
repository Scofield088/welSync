import { createSlice } from "@reduxjs/toolkit";

const yogaSlice = createSlice({
  name: "yoga",
  initialState: { feedback: "" },
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload;
    },
  },
});

export const { setFeedback } = yogaSlice.actions;
export default yogaSlice.reducer;
