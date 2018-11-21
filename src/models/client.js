module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('clients', {
    clientName: DataTypes.STRING,
    clientId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    clientSecret: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  return Client;
};
