import React, { useReducer } from "react";

import Axios from "axios";

// const initialState = {
//   id: "",
//   name: "",
//   email: "",
//   password: "",
//   password_confirmation: "",
//   cpf: "",
//   rg: "",
//   admin: false
// };

const reducer = (state, action) => {
  switch (action.type) {
    case "set-data":
      return { ...state, ...action.payload };
    case "change-data":
      return { ...state, [action.payload.name]: action.payload.value };
    default:
      throw new Error("invalid action type " + action.type);
  }
};

const useForm = (baseUrl, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const submitForm = callback => {
    let promise;

    if (state.id) {
      promise = Axios.put(baseUrl + "/" + state.id, state);
    } else {
      promise = Axios.post(baseUrl, state);
    }

    promise
      .then(result => {
        setData(result.data);
        // toastr.success("Dados salvos com sucesso!");
        Swal.fire({
          title: "Sucesso!",
          text: "Dados salvos com sucesso!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        if (callback) callback();
      })

      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao salvar os dados!"
        });
        console.error(error);
        console.log(error.response.data.errors);
      });
  };

  const handleInputChange = event => {
    const el = event.target;
    const name = el.name;
    let value;
    if (el.type === "checkbox") {
      value = el.checked;
    } else {
      value = el.value;
    }
    dispatch({ type: "change-data", payload: { name, value } });
  };

  const setData = data => {
    dispatch({ type: "set-data", payload: data });
  };

  return {
    inputData: state,
    handleInputChange,
    submitForm,
    setData
  };
};

export default useForm;
