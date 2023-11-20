
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserCrud = () => {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [editUserId, setEditUserId] = useState(null);
  const [editUserName, setEditUserName] = useState('');

  useEffect(() => {
  
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddUser = () => {
    
    axios.post('https://jsonplaceholder.typicode.com/users', { name: newUserName })
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));

    
    setNewUserName('');
  };

  const handleEditUser = (userId) => {
    // Set the user to edit
    const userToEdit = users.find(user => user.id === userId);
    setEditUserId(userId);
    setEditUserName(userToEdit.name);
  };

  const handleUpdateUser = () => {
    // Update the user's name
    axios.put(`https://jsonplaceholder.typicode.com/users/${editUserId}`, { name: editUserName })
      .then(response => {
        setUsers(users.map(user => (user.id === editUserId ? response.data : user)));
        setEditUserId(null);
        setEditUserName('');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  const handleCancelEdit = () => {

    setEditUserId(null);
    setEditUserName('');
  };

  const handleDeleteUser = (userId) => {
    
    axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(() => setUsers(users.filter(user => user.id !== userId)))
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <div>
      <h2>User CRUD Operations</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {editUserId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                />
                <br></br>
                <button onClick={handleUpdateUser}>Update</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                {user.name}
                <button onClick={() => handleEditUser(user.id)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Enter new user name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
};

export default UserCrud;
