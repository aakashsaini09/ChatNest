// import { atom } from "recoil";
// export const UserData = atom({
//     key: "email",
//     default: ""
// })

import { atom } from "recoil";

interface UserData {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const userDataState = atom<UserData>({
  key: "userDataState",
  default: {
    id: "",
    username: "",
    email: "",
    password: ""
  }
});



