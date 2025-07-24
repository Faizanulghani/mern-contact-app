import { useState } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
// import { ContactProvider } from "./components/store/store";
import { CiDark, CiLight } from "react-icons/ci";
import { ToastContainer } from 'react-toastify';

function App() {
  let [signinActive, setSigninActive] = useState(true);
  let [theme, setTheme] = useState("dark");

  let handleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <ToastContainer />
      <div className={`container ${theme === "dark" ? "dark" : ""}`}>
        <div className="row pt-5">
          <div className="col-md-2"></div>
          <div className="col-md-8 shadow-lg mt-5 ">
            <div className="row overflow-hidden rounded">
              <div
                className={`col-md-6 py-5 login-form rounded 
                  ${theme === "dark" ? "lg-color" : ""}`}
              >
                <SignIn
                  signinActive={signinActive}
                  setSigninActive={setSigninActive}
                />
              </div>
              <SignUp
                signinActive={signinActive}
                setSigninActive={setSigninActive}
              />
            </div>
          </div>
          <div className="col-md-2"></div>
        </div>
        <div className="theme">
          {theme == "dark" ? (
            <CiLight className="day" onClick={handleTheme} />
          ) : (
            <CiDark className="night" onClick={handleTheme} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
