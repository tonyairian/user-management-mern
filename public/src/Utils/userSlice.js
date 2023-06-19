import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    profileImg: "",
  },
  reducers: {
    userLogin: (state, action) => {
      // console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.user;
      state.profileImg = action.payload.image;
    },
  },
});
export const { userLogin } = userSlice.actions;

export default userSlice.reducer;
