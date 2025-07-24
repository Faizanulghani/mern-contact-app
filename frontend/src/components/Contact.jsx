import { useEffect, useState } from "react";
import Accordion from "./Accordion";
import CreateAccordion from "./CreateAccordion";
import RestoreAccordion from "./RestoreAccordion";
import { CiDark, CiLight } from "react-icons/ci";
import { useNavigate } from "react-router";
const Contact = () => {
  let [name, setName] = useState("");
  let [number, setNumber] = useState("");
  let [data, setData] = useState([]);
  let [toggle, setToggle] = useState(false);
  let [editIndex, setEditIndex] = useState(null);
  let [restore, setRestore] = useState([]);

  let navigate = useNavigate();

  let [theme, setTheme] = useState("dark");

  let handleTheme = () => {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  };

  let username = sessionStorage.getItem("username");
  let msg = JSON.parse(localStorage.getItem(username)) || {};
  useEffect(() => {
    let saveData = JSON.parse(localStorage.getItem(username + "list")) || [];
    let saveRestore =
      JSON.parse(localStorage.getItem(username + "restore")) || [];
    setData(saveData);
    setRestore(saveRestore);
  }, [username]);

  let handleUpdate = (index) => {
    setName(data[index].name);
    setNumber(data[index].number);
    setEditIndex(index);
    setToggle(true);
  };

  let handleUpdateAccr = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      let updateContacts = [...data];
      updateContacts[editIndex] = { name, number };
      setData(updateContacts);
      localStorage.setItem(username + "list", JSON.stringify(updateContacts));
      setName("");
      setNumber("");
      setToggle(false);
      setEditIndex(null);
    }
  };

  let handleDelAccount = () => {
    let alert = confirm("Do You Wanna Delete your Account");
    if (alert) {
      localStorage.removeItem(username + "list");
      localStorage.removeItem(username);
      localStorage.removeItem(username + "restore");
      sessionStorage.removeItem("username");
      navigate("/");
    }
  };

  return (
    <div
      className={`container ${theme == "dark" ? "dark text-white" : "light"}`}
    >
      <div className="theme">
        {theme == "dark" ? (
          <CiLight className="day" onClick={handleTheme} />
        ) : (
          <CiDark className="night" onClick={handleTheme} />
        )}
      </div>
      <button className="del" onClick={handleDelAccount}>
        Delete Account!
      </button>
      <div className="row py-3">
        <div className="col-md-12 text-center">
          <h1 id="welcome">
            Welcome{" "}
            <strong>
              {msg && msg.gender == "male" ? "Mr" : "Ms"}.{username}
            </strong>{" "}
            in Contact App
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <h2>Create Contact</h2>
          <div className="accordion mb-3">
            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse-create"
                >
                  Create New Contact
                </button>
              </h5>
              <CreateAccordion
                name={name}
                number={number}
                setName={setName}
                setNumber={setNumber}
                setData={setData}
                data={data}
                handleUpdate={handleUpdate}
                toggle={toggle}
                handleUpdateAccr={handleUpdateAccr}
              />
            </div>
          </div>
        </div>

        <Accordion
          data={data}
          setData={setData}
          handleUpdate={handleUpdate}
          setRestore={setRestore}
          restore={restore}
        />

        <div className="col-md-4">
          <h2>Restore Deleted Contact</h2>
          <div id="restore-delete">
            {restore.map((e, index) => {
              return (
                <RestoreAccordion
                  restore={restore}
                  setRestore={setRestore}
                  e={e}
                  key={index}
                  index={index}
                  setData={setData}
                  data={data}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
