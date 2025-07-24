import { MdDelete, MdSettingsBackupRestore } from "react-icons/md";

const RestoreAccordion = ({ e, index, restore, setRestore, setData, data }) => {
  let username = sessionStorage.getItem("username");
  let handleRestoreDelete = (index) => {
    let updateContact = [...restore];
    updateContact.splice(index, 1)[0];
    setRestore(updateContact);
    localStorage.setItem(username + "restore", JSON.stringify(updateContact));
  };

  let handleRecoverDelete = (index) => {
    let updateContact = [...restore];
    let recoveredContact = updateContact.splice(index, 1)[0];
    let updatedData = [...data, recoveredContact];
    setData(updatedData);
    setRestore(updateContact);
    localStorage.setItem(username + "list", JSON.stringify(updatedData));
    localStorage.setItem(username + "restore", JSON.stringify(updateContact));
  };

  return (
    <div className="accordion mb-3" key={index}>
      <div className="accordion-item">
        <h5 className="accordion-header">
          <button
            className="accordion-button"
            data-bs-toggle="collapse"
            data-bs-target={`#restore-${index}`}
          >
            {e.name}
          </button>
        </h5>
        <div className="accordion-collapse collapse" id={`restore-${index}`}>
          <div className="accordion-body">
            <div className="row">
              <div className="col-md-6">
                <h5>{e.name}</h5>
                <p>{e.number}</p>
              </div>
              <div className="col-md-6 d-flex justify-content-around align-items-center position-relative">
                <MdSettingsBackupRestore
                  className="icons"
                  onClick={() => handleRecoverDelete(index)}
                />
                <MdDelete
                  className="icons"
                  onClick={() => handleRestoreDelete(index)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestoreAccordion;
