import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddUser from './AddUser'

function App() {
  const [data, setData] = useState([]);

  const fetchdata = () => {
    axios.get('http://localhost:3000/show_data')
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchdata();
  }, [])

  return (
    <div className="container mt-5">

      <AddUser fetchdata={fetchdata} />

      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">User Data</h3>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Age</th>
                </tr>
              </thead>
              <tbody>
                {data.map((s, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.age}</td>
                    </tr>
                  )})
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App