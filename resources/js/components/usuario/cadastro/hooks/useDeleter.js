import React, { useState, useEffect, useCallback, useReducer } from "react";

import Axios from "axios";
import Swal from "sweetalert2";

// remove trailing slash if it was given
const cleanUrl = dirtyUrl => {
  if ("/" == dirtyUrl.charAt(dirtyUrl.length - 1)) {
    return dirtyUrl.slice(0, -1);
  }
  return dirtyUrl;
};

const useDeleter = baseUrl => {
  baseUrl = cleanUrl(baseUrl);

  const deleteRecord = (id, callback) => {
    Axios.delete(baseUrl + "/" + id).then(result => {
      Swal.fire({
        title: "Sucesso!",
        text: "Os dados foram apagados com sucesso!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
      if (callback) callback();
    });
  };

  return {
    deleteRecord
  };
};

export default useDeleter;
