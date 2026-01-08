const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Wallet = require('./wallet.model');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.ENUM('CREDIT', 'DEBIT'),
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }, 
    category: {
        type: DataTypes.STRING(50)
    },
    description: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'transactions',
    timestamps: true
})
Wallet.hasMany(Transaction, { foreignKey: 'walletId' });
Transaction.belongsTo(Wallet, { foreignKey: 'walletId' });

module.exports = Transaction;