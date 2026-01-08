const Wallet = require('../models/wallet.model');

const Transaction = require('../models/transaction.model');
// adding money to wallet
exports.addMoney = async (userId, data) => {
    const {amount, description} = data;
    const wallet = await Wallet.findOne({where: {userId}});
    if (!wallet) {
  throw new Error('Wallet not found for this user');
}
    wallet.balance = Number(wallet.balance) + Number(amount);
    await wallet.save();

    await Transaction.create({
        walletId: wallet.id,
        type: 'CREDIT',
        amount,
        description,
        category: 'ADD_MONEY'
    });
    return wallet
}
// spend money from wallet
exports.spendMoney = async (userId, data) => {
    const {amount, description} = data;
    const wallet = await Wallet.findOne({where: {userId}});
    if(wallet.balance < amount) {
        throw new Error('Insufficient balance');
    }
    wallet.balance = Number(wallet.balance) - Number(amount)
    await wallet.save();

      await Transaction.create({
    walletId: wallet.id,
    type: 'DEBIT',
    amount,
    category: 'SPEND_MONEY',
    description
  });
  return wallet
}
// Transaction History
exports.getTransactions = async (userId) => {
  const wallet = await Wallet.findOne({ where: { userId } });
  return Transaction.findAll({
    where: { walletId: wallet.id },
    order: [["createdAt", "DESC"]],
  });
};