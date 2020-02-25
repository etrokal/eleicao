import { DateTime } from "luxon";

export default {
  cpfFormat(cpf) {
    let formattedCpf =
      cpf.slice(0, 3) +
      "." +
      cpf.slice(3, 6) +
      "." +
      cpf.slice(6, 9) +
      "-" +
      cpf.slice(9);

    return formattedCpf;
  },

  dateFormat(sqlDate) {
    const date = DateTime.fromSQL(sqlDate);
    return date.setLocale("pt-br").toLocaleString();
  }
};
