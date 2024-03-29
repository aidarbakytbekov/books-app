export const errorCatch = (error) => {
  return error.response && error.response.data
    ? error.response.data
    : error.message;
};
