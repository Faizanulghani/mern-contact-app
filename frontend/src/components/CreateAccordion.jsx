const CreateAccordion = ({
  name,
  number,
  setName,
  setNumber,
  setData,
  data,
  toggle,
  handleUpdateAccr,
}) => {
  let username = sessionStorage.getItem("username");

  let handleCreateAccordion = (e) => {
    e.preventDefault();
    if (name && number) {
      let newData = [...data, { name, number }];
      setData(newData);
      localStorage.setItem(username + "list", JSON.stringify(newData));
      setName("");
      setNumber("");
    } else {
      alert("Fill all fields");
    }
  };
  return (
    <div className="accordion-collapse collapse show" id="collapse-create">
      <div className="accordion-body">
        <form>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3 name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contact"
            className="form-control mb-3 number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <div className="btn-box">
            {toggle ? (
              <button
                className="btn btn-danger"
                id="update-btn"
                onClick={handleUpdateAccr}
              >
                Update
              </button>
            ) : (
              <button
                className="btn"
                id="create-btn"
                onClick={handleCreateAccordion}
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccordion;
