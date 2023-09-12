import React, { createContext, useState, useContext, useEffect } from 'react';

const UsersContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // call API to get list of user
  //   Administrator, Editor, Viewer
    const usersFromAPI = [
      { id: '1', name: "mohita gandhi", email: "mohita.gandhi@tecblic.com", password: "mohita@tecblic", role: "Viewer" },
      { id: '2', name: "Shinoj Nair", email: "Shinoj.Nair@tecblic.com", password: "Shinoj@tecblic", role: "Administrator" },
      { id: '3', name: "danish shaikh", email: "danish.shaikh@tecblic.com", password: "danish@tecblic", role: "Editor" },
    ]
    setUsers(usersFromAPI)
  }, [])


  const updateUsers = (updatedUserList) => {
    setUsers(updatedUserList);
  };

  return (
    <UsersContext.Provider value={{ users, updateUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
