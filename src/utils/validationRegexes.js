const validationRegexes = {
  nameRegex: /^[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/,
  emailRegex: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  phoneRegex: /^(?:(?:\+?\d{1,3}\s?)?(?:\(\d{1,}\)|\d{1,})[-.\s]?){1,}\d{1,}$/,
  passwordRegex: /^(?=.*[A-Za-zĄĆĘŁŃÓŚŹŻąćęłńóśźż])(?=.*\d).{8,}$/,
  authorsNamesRegex: /^([A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+\s+[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+)(,\s*[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+\s+[A-Za-zęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+)*$/,
};

export default validationRegexes;