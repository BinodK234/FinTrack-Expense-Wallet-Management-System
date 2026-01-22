const Transaction = require('../models/transaction.model');
const Wallet = require('../models/wallet.model');

const { Op } = require('sequelize');

exports.getMonthlySummary = async (userId, month, year) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    const wallet = await Wallet.findOne({ where: {userId }})
    const transactions = await Transaction.findAll({
        where: {
            walletId: wallet.id,
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }
    })

    let totalCredit = 0
    let totalDebit = 0;

    transactions.forEach(txn => {
        if(txn.type === 'CREDIT') totalCredit += Number(txn.amount);
        else totalDebit += Number(txn.amount);
    })
    return {
        month,
        year,
        totalCredit,
        totalDebit,
        transactionsCount: transactions.length
    }
}

// exports.getCashFlow = async (userId, month, year) => {
//     const startDate = new Date(year, month - 1, 1);
//     const endDate = new Date(year, month, 0, 23, 59, 59);
//     const wallet = await Wallet.findOne({ where: {userId }})

//     const transactions = await Transaction.findAll({
//         where: {
//             walletId: wallet.id,
//             createdAt: {
//                 [Op.between]: [startDate, endDate]
//             }
//         },
//             order: [['createdAt', 'ASC']]
        
//     })
//     const dailyCashFlow = {};

//     transactions.forEach(txn => {
//         const day = txn.createdAt.toISOString().split('T')[0];
//     if(!dayily[day]) {
//         daily[day] = { credit: 0, debit: 0 };
//     }   
//     if(txn.type === 'CREDIT') daily[day].credit += Number(txn.amount);
//     else daily[day].debit += Number(txn.amount);

//  })
//  return dailyCashFlow
// }


exports.getCashflow = async (userId, month, year) => {

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const wallet = await Wallet.findOne({ where: { userId } });

  const transactions = await Transaction.findAll({
    where: {
      walletId: wallet.id,
      createdAt: { [Op.between]: [start, end] }
    },
    order: [['createdAt', 'ASC']]
  });

  const daily = {};

  transactions.forEach(t => {
    const day = t.createdAt.toISOString().split('T')[0];

    if (!daily[day]) {
      daily[day] = { credit: 0, debit: 0 };
    }

    if (t.type === 'CREDIT') daily[day].credit += Number(t.amount);
    else daily[day].debit += Number(t.amount);
  });

  return daily;
};


exports.getCategoryReport = async (userId, month, year) => {

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const wallet = await Wallet.findOne({ where: { userId } });

  const transactions = await Transaction.findAll({
    where: {
      walletId: wallet.id,
      type: 'DEBIT',
      createdAt: { [Op.between]: [start, end] }
    }
  });

  const categories = {};

  transactions.forEach(t => {
    const cat = t.category || 'Others';
    categories[cat] = (categories[cat] || 0) + Number(t.amount);
  });

  return categories;
};

