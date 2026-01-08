const walletService = require("../services/wallet.service");

exports.addMoney = async (req, res) => {
  try {
    const wallet = await walletService.addMoney(req.user.id, req.body);
    res.json({ message: "Money added", wallet });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.spendMoney = async (req, res) => {
  try {
    const wallet = await walletService.spendMoney(req.user.id, req.body);
    res.json({ message: "Transaction successful", wallet });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getTransactions = async (req, res) => {
  try {
    const data = await walletService.getTransactions(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};