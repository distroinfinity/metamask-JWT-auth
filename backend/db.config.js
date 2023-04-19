module.exports = {
  HOST: "localhost",
  USER: "me",
  PASSWORD: "password",
  DB: "api",
  algorithms: ["HS256"],
  secret: "ABCDEF",

  
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
