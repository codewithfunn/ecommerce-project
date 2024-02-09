import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUser.css';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token'),
    },
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getAllUsers', config);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllUsers();
  }, []);

  return (
    <>
    <div>
      <h2>Manage Users</h2>
    </div>
    <div className='UserContainer mb-4'>
     {users.map((user) => (
      <div key={user._id}>
    <div className="Usercard p-6">
    <div className="card-border-top">
    </div>
    <div className="img">
    </div>
    <span> {user.name} </span>
    <p className="job"> {user.email}</p>
    <p className="job"> {user.username}</p>
    <p className="job"> {user.address}</p>

    <button> Remove User
    </button>
  </div>
  </div>
        ))}
        </div>
  </>
  );
};

export default ManageUser;
