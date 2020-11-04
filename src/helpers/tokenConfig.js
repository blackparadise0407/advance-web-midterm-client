const tokenConfig = (stateToken) => {
  let token = stateToken || localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

export default tokenConfig;
