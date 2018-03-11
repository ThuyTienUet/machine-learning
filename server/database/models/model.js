module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Model', {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dims_input: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        params: {
            type: DataTypes.STRING,
            allowNull: true
        },
        data: {
            type: DataTypes.STRING,
            allowNull: true
        },
        target: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mse: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        user_created: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};
