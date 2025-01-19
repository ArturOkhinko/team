const { DataTypes } = require('sequelize')
const sequelize = require('../../database')

const fs = require('fs')
const path = require('path')

const db = {}
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))
        db[model.name] = model
    })

db.Url.hasMany(db.Click, {
    foreignKey: 'urlId',
    as: 'clicks',
})

db.Click.belongsTo(db.Url, {
    foreignKey: 'urlId',
    onDelete: 'CASCADE'
})

module.exports = db
