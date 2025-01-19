const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const Url = sequelize.define('Url', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'urls',
    timestamps: true
})

module.exports = Url
