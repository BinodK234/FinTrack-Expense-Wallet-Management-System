const reportService = require('../services/report.service');

exports.getMonthlySummary = async (req, res) => {
    try {
      const {month, year} = req.query;
      const data  = await reportService.getMonthlySummary(req.user.id, Number(month), Number(year));
      res.json(data)
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.getCashflow = async (req, res) => {
  try {
    const { month, year } = req.query;

    const data = await reportService.getCashflow(
      req.user.id,
      Number(month),
      Number(year)
    );

    res.json(data);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


exports.getCategoryReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    const data = await reportService.getCategoryReport(
      req.user.id,
      Number(month),
      Number(year)
    );

    res.json(data);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

