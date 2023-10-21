import React, { useEffect, useState } from "react";
import axios from "axios";

const URL = "http://127.0.0.1:8000/";

export default function ViewAllUsers() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "/get_all_users")
      .then((response) => {
        setData(response.data.users);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function handelDeleteBtn(user) {
    if (
      window.confirm(
        `Are you should you want to delete ${user.first_name} ${user.last_name} ?`
      )
    ) {
      axios
        .delete(`${URL}/delete_user/${user.id}`)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }

  return (
    <div className="container-fluid">
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
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Job</th>
                  <th>Address</th>
                  <th>National id</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email ? "***" : "-"}</td>
                    <td>{user.phone ? "***" : "-"}</td>
                    <td>{user.age ? user.age : "-"}</td>
                    <td>{user.job ? user.job.slice(0, 5) + "..." : "-"}</td>
                    <td>
                      {user.address ? user.address.slice(0, 5) + ".." : "-"}
                    </td>
                    <td>{user.national_id ? "***" : "-"}</td>
                    <td>
                      <button
                        className="text-danger border-0 bg-color bg-transparent"
                        onClick={() => handelDeleteBtn(user)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
