const processFormState = formState => {
  const formFields = [];

  const convertRecursively = (outerKey, key, val) => {
    if (typeof val !== 'object') {
      let field = [`${outerKey ? `${outerKey}.` : ''}${key}`, val];
      formFields.push(field);
      return;
    }
    for (const [innerKey, innerVal] of Object.entries(val)) {
      convertRecursively(key, innerKey, innerVal);
    }
  };

  for (const [key, val] of Object.entries(formState)) {
    convertRecursively('', key, val);
  }

  return formFields;
};

export default processFormState;
