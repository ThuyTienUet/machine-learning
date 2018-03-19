module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Model', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
};
