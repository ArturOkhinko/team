const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const Click = sequelize.define('Click', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ip: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    urlId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
    },
}, {
    tableName: 'clicks',
    timestamps: true,
})

module.exports = Click
