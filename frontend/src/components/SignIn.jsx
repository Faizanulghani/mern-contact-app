import { FaGoogle, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignIn = ({ signinActive, setSigninActive }) => {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data.success) {
      navigate("/contact");
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div
        className={
          signinActive
            ? "animate__animated animate__fadeOutUp active-box"
            : "animate__animated animate__fadeInDown active-box"
        }
        style={
          signinActive
            ? { opacity: "0", zIndex: "-1" }
            : { opacity: "1", zIndex: "0" }
        }
      >
        <h2>Sign In</h2>
        <p>Sign In if you have any account</p>
        <button onClick={() => setSigninActive(true)}>Sign In</button>
      </div>
      <h2 className="text-center">SIGN IN</h2>
      <div className="text-center">
        <FaInstagram className="i" />
        <FaWhatsapp className="i" />
        <FaGoogle className="i" />
      </div>
      <br />
      <form onSubmit={handleSignIn}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="form-control mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <a href="#">Forget Password</a>
          <br />
          <br />
          <button className="btn" id="login-btn">
            Sign In
          </button>
          <p className="l-msg"></p>
        </div>
      </form>
    </>
  );
};

export default SignIn;
