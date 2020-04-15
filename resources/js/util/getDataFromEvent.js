const getDataFromEvent = e => {
  let name;
  let value;

  if (e.type === "customInput") {
    name = e.detail.name;
    value = e.detail.value;
  } else {
    const input = e.target;
    name = input.name;

    if (input.type === "checkbox") {
      value = !!input.checked;
    } else {
      value = input.value;
    }
  }

  return { name, value };
};

export default getDataFromEvent;
