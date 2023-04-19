module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nonce: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 10000),
    },
    publicAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isLowercase: true },
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
  });

  return User;
};
