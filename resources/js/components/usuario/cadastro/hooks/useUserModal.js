import React, { useState, useEffect } from "react";

const useUserModal = () => {
  const [ user, setUser ] = useState({});

  const setModalUser = newUser => {
    setUser(newUser);
  };

  const getModalUser = () => {
    return user;
  };

  return {
    setModalUser,
    getModalUser
  };
};

export default useUserModal;
