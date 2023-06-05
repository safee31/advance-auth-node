const handle = (promise) => {
  return promise
    .then((data) => [data, null])
    .catch((error) => Promise.resolve([null, error]));
};

module.exports = { handle };
