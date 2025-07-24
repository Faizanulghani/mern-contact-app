import { useState } from "react";
import { FaGoogle, FaInstagram, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
const SignUp = ({ setSigninActive, signinActive }) => {
  let [name, setName] = useState("");
  let [lastName, setLastName] = useState("");
  let [gender, setGender] = useState("male");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [msg, setMsg] = useState(false);
  let [sameUser, setSameUser] = useState(false);

  let handleSignUp = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !gender || !username || !password) {
      return setMsg(true);
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        { firstname: name, lastname: lastName, gender, username, password }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-6 py-5 login-form">
      <div
        className={
          !signinActive
            ? "animate__animated animate__fadeOutUp active-box"
            : "animate__animated animate__fadeInDown active-box"
        }
        style={
          !signinActive
            ? { opacity: "0", zIndex: "-1" }
            : { opacity: "1", zIndex: "0" }
        }
      >
        <h2>Sign Up</h2>
        <p>Sign Up if you have not any account</p>
        <button onClick={() => setSigninActive(false)}>Sign Up</button>
      </div>
      <h2 className="text-center">SIGN UP</h2>
      <div className="text-center">
        <FaInstagram className="i" />
        <FaWhatsapp className="i" />
        <FaGoogle className="i" />
      </div>
      <br />
      <form onSubmit={handleSignUp}>
        <input
          id="f-name"
          name="firstname"
          type="text"
          placeholder="First Name"
          className="form-control mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />  
        <input
          id="l-name"
          name="lastname"
          type="text"
          placeholder="Last Name"
          className="form-control mb-3"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <select
          className="form-select mb-3"
          id="floatingSelect"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="gender" disabled>
            Select Your Gender:
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          id="s-username"
          name="username"
          type="text"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          id="s-password"
          name="password"
          type="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <br />
          <button className="btn">Sign Up</button>
          <p className="msg">
            {msg ? "Fill all fields" : ""}
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
