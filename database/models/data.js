module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Data', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: false
        },
        target: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

};