import { createSlice } from '@reduxjs/toolkit'
export interface CounterState {
  _id: String,
  name: string,
  email: String,
  profile_pic: string,
  token: String,
  onlineUser: any,
  socketConnection?: any
}
const initialState: CounterState = {
  _id: "",
  name: "",
  email: "",
  profile_pic: "",
  token: "",
  onlineUser: [],
  socketConnection: null
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state._id = action.payload._id,
        state.name = action.payload.name
        state.email = action.payload.email
        state.profile_pic = action.payload.profile_pic
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    // @ts-ignore
    logout:  (state, action) => {
        state._id = ""
        state.name = ""
        state.email = ""
        state.profile_pic = ""
        state.token = ""
        state.socketConnection = null
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload
    },
    setSocketConnection : (state, action) => {
      state.socketConnection = action.payload
    }
  },
})
export const { setUser, setToken, logout, setOnlineUser, setSocketConnection } = userSlice.actions
export default userSlice.reducer

