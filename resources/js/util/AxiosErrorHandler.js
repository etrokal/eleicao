const AxiosErrorHandler = error => {
  let msg;
  let errorObj;

  if (error.response) {
    msg = `O servidor respondeu com um erro. O código de status recebido é ${error.response.status}.`;
    errorObj = {
      msg,
      data: error.response.data,
      headers: error.response.headers
    };
  } else if (error.request) {
    msg = `Não foi possível obter uma resposta do servidor. Isso pode indicar um problema na sua conexão ou um problema de indisponibilidade do servidor. Tente novamente mais tarde.`;
    errorObj = {
      msg,
      headers: error.request.headers
    };
  } else {
    msg = `Não foi possível fazer a requisição para o servidor`;
    errorObj = {
      msg,
      data: error
    };
  }

  console.error(error);
  return errorObj;
};

export default AxiosErrorHandler;
