import axios from "axios";

// export function testFunction() {
//   console.log("test");
// }

export function registerUser(username: string) {
  axios
    .post("http://localhost:3000/register-user", { username: username })
    .catch((error) => console.error(error));

}

// export function listUsers() {
//   return axios.get("http://localhost:3000/active-list").then((response) => {
//     console.log("response.data.userlist", response.data.userlist);
//     return response.data.userlist;
//   });
// }