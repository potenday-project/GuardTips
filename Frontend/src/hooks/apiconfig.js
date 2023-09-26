const configs = {
  development: {
    SERVER_URI: "localhost:3000",
  },
  production: {
    SERVER_URI: "https://www.guardsafe.store",
  },
};

module.exports.apiconfig = configs[process.env.NODE_ENV];
