module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define("comments", {
    firstName: {
        type: DataTypes.TEXT,
        allowNull: false
              },
    lastName: {
        type: DataTypes.TEXT,
        allowNull: false
             },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  });
  return comments;
};
