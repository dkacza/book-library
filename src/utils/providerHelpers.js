const providerHelpers = {
  INITIAL_STATUS: {
    error: '',
    confirm: '',
  },
  setSuccessStatus: (setter, message) => {
    setter({
      error: '',
      success: message,
    });
  },
  setErrorStatus: (setter, message) => {
    setter({
      error: message,
      success: '',
    });
  },
};

export default providerHelpers;
