import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../css/SearchBar.css";
import axios from "axios";

export default function CheckedIn(props) {
  const URL = props.url;
  const [input, setInput] = useState("");
  const [users, setUsers] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await axios(`${URL}/users/get_users/clients`);
        setUsers(users);
      } catch (error) {
        toast.error(`Error fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);

  const fetchData = async (value) => {
    const results = users.data.filter((user) => {
      return (
        user.id.toString()?.toLowerCase()?.includes(value) ||
        false ||
        user.first_name?.toLowerCase()?.includes(value) ||
        false ||
        user.last_name?.toLowerCase()?.includes(value) ||
        false ||
        user.phone?.toLowerCase()?.includes(value) ||
        false ||
        user.email?.toLowerCase()?.includes(value) ||
        false
      );
    });
    if (results) setResults(results);
  };

  const handleChange = (value) => {
    setInput(value);
    if (value) fetchData(value);
    else setResults([]);
  };

  const handleStart = async (x) => {};

  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={true}
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <div className="search-bar-container mx-5 px-5">
        <div className="input-wrapper">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            placeholder="Type to search..."
            value={input}
            onChange={(e) => handleChange(e.target.value.trim())}
          />
        </div>
        {results && results.length > 0 && (
          <div className="results-list">
            {results.map((user) => {
              return (
                <div className="search-result border-bottom" key={user.id}>
                  <div className="px-5 p-1 row">
                    <div className="col-1 text-start ">{user.id} :</div>
                    <div className="col-2 text-start "> {user.first_name} </div>
                    <div className="col-2 text-start ">{user.last_name} </div>
                    <div className="col-3 text-start ">
                      {user.email ?? "-"}{" "}
                    </div>
                    <div className="col-3 text-start ">
                      {user.phone ?? "-"}{" "}
                    </div>
                    <button
                      className="btn btn-success"
                      onClick={() => handleStart(user.id)}
                    >
                      Start
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <br />
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              id="dataTable"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Checked-in time</th>
                  <th>Check-out</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
