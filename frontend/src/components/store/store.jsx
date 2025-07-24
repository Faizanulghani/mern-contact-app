import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

export let Contacts = createContext();

// export let ContactProvider = ({ children }) => {
//   const navigate = useNavigate();
//   let handleSignIn = (username, password, e) => {
//     e.preventDefault();
//     let getData = JSON.parse(localStorage.getItem(username));
//     if (getData && getData.username === username) {
//       let getPass = getData.password;
//       if (getPass == password) {
//         navigate("/contact");
//         sessionStorage.setItem("username", username);
//       } else {
//         alert("Password does not match!");
//       }
//     } else {
//       alert("Username does not match!");
//     }
//   };

//   let handleSignUp = (
//     e,
//     name,
//     lastName,
//     gender,
//     username,
//     password,
//     setSameUser,
//     setMsg,
//     setName,
//     setLastName,
//     setGender,
//     setUsername,
//     setPassword
//   ) => {
//     e.preventDefault();
//     let formatUsername = username.trim().toLowerCase();
//     if (name && lastName && gender != "gender" && username && password) {
//       const userData = { name, lastName, gender, username, password };
//       if (localStorage.getItem(formatUsername) != null) {
//         setMsg(false);
//         setSameUser(true);
//       } else {
//         localStorage.setItem(formatUsername, JSON.stringify(userData));
//         setName("");
//         setLastName("");
//         setGender("gender");
//         setUsername("");
//         setPassword("");
//       }
//     } else {
//       setMsg(true);
//       setSameUser(false);
//     }
//   };

//   return (
//     <Contacts.Provider value={{ handleSignIn, handleSignUp }}>
//       {children}
//     </Contacts.Provider>
//   );
// };

export const useAccount = () => {
  let context = useContext(Contacts);
  return context;
};
