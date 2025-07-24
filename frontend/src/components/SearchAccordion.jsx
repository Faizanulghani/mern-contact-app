import { useEffect } from "react";
import { IoIosExit } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SearchAccordion = ({ searchValue, handleSearch }) => {
  let navigate = useNavigate();
  let userName = sessionStorage.getItem("username");

  useEffect(() => {
    if (!userName) {
      navigate("/");
    }
  }, [userName, navigate]);

  let handleLogout = () => {
    sessionStorage.removeItem("username");
    navigate("/");
  };

  return (
    <form>
      <div className="input-group my-3">
        <input
          type="text"
          placeholder="Search"
          id="search"
          className="form-control"
          value={searchValue}
          onChange={(e) => handleSearch(e)}
        />
        <span
          className="input-group-text"
          id="logout-btn"
          onClick={handleLogout}
        >
          <IoIosExit className="i" />
        </span>
      </div>
    </form>
  );
};

export default SearchAccordion;
