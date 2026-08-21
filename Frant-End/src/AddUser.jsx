import React, { useState } from 'react'
import axios from 'axios'

function AddUser({ fetchdata }) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        age: ''
    })
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3000/add_data', user)
            .then((res) => {
                console.log(res.data)
                setUser({
                    name: '',
                    email: '',
                    age: ''
                })
                // Table ko refresh karega
                fetchdata()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className="card shadow mb-4">
            <div className="card-header bg-success text-white">
                <h4 className="mb-0">Add User</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Name</label>
                            <input type="text" name="name" className="form-control" value={user.name}
                            onChange={handleChange} placeholder="Enter name" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Email</label>
                            <input type="email" name="email" className="form-control" value={user.email}
                            onChange={handleChange} placeholder="Enter email" required/>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label">Age</label>
                            <input type="number" name="age" className="form-control" value={user.age}
                            onChange={handleChange} placeholder="Enter age" required/>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success mt-3">Add User</button>
                </form>
            </div>
        </div>
    )
}

export default AddUser