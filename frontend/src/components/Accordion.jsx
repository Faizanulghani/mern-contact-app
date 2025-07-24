import { FaEdit, FaPhoneAlt, FaTrashAlt } from "react-icons/fa";
import SearchAccordion from "./SearchAccordion";
import { FaMessage } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
const Accordion = ({ data, setData, handleUpdate, setRestore, restore }) => {
  let [searchValue, setSearchValue] = useState("");
  let [filteredData, setFilteredData] = useState(data);
  let [showHide, setShowHide] = useState({});
  let username = sessionStorage.getItem("username");

  useEffect(() => {
    let filteredContacts = data.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filteredContacts);
  }, [searchValue, data]);

  let handleDelete = (index) => {
    let updateContact = [...data];
    let deletedItem = updateContact.splice(index, 1)[0];
    setRestore([...restore, deletedItem]);

    setData(updateContact);
    localStorage.setItem(username + "list", JSON.stringify(updateContact));

    let restoredData =
      JSON.parse(localStorage.getItem(username + "restore")) || [];
    restoredData.push(deletedItem);
    localStorage.setItem(username + "restore", JSON.stringify(restoredData));
  };

  let toggleShowHinde = (index) => {
    setShowHide((prev) => ({ ...prev, [index]: !prev[index] }));
  };
  return (
    <div className="col-md-4 contact-list-box">
      <SearchAccordion
        handleSearch={(e) => setSearchValue(e.target.value)}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <h2>Contact Details</h2>

      <div className="contact-details">
        {filteredData.map((e, index) => (
          <div className="accordion mb-3" key={index}>
            <div className="accordion-item">
              <h5 className="accordion-header">
                <button
                  className="accordion-button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse-${index}`}
                >
                  {e.name}
                </button>
              </h5>
              <div
                className="accordion-collapse collapse"
                id={`collapse-${index}`}
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>{e.name}</h5>
                      <p>{e.number}</p>
                    </div>
                    <div className="col-md-6 d-flex justify-content-around align-items-center position-relative">
                      <FaMessage className="icons" />
                      <FaPhoneAlt className="icons" />
                      <HiDotsVertical
                        className="icons"
                        onClick={() => toggleShowHinde(index)}
                      />
                      <div
                        className={`option-box ${
                          showHide[index] ? "" : "d-none"
                        }`}
                      >
                        <FaEdit
                          className="icons"
                          onClick={() => handleUpdate(index)}
                        />
                        <FaTrashAlt
                          className="icons"
                          onClick={() => handleDelete(index)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accordion;
