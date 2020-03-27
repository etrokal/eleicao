const getDataFromEvent = e => {
  const input = e.target;
  const name = input.name;
  let value;
  if (input.type === "checkbox") {
    value = !!input.checked;
  } else {
    value = input.value;
  }

  return { name, value };
};

export default getDataFromEvent;
