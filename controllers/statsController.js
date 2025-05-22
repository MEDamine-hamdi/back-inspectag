const Orders = require('../models/order'); // Adjust path if needed

// 1) Monthly defects by user
exports.monthlyDefectsByUser = async (req, res) => {
  try {
    const results = await Orders.aggregate([
      { $unwind: "$results" },            // unwind results array
      { $unwind: "$results.detections" }, // unwind detections inside results
      { $unwind: "$results.detections.defects" }, // unwind defects inside detections

      {
        $group: {
          _id: {
            month: { $month: "$dateImpression" },
            agent: "$agent"
          },
          defectCount: { $sum: 1 }
        }
      },
      {
        $project: {
          month: "$_id.month",
          agent: "$_id.agent",
          defectCount: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.json(results);
  } catch (error) {
    console.error("monthlyDefectsByUser error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 2) Sorted defects (lowest to highest)
exports.sortedDefects = async (req, res) => {
  try {
    const results = await Orders.aggregate([
      { $unwind: "$results" },
      { $unwind: "$results.detections" },
      { $unwind: "$results.detections.defects" },

      {
        $group: {
          _id: "$results.detections.defects.defect_type",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          defect_type: "$_id",
          count: 1,
          _id: 0
        }
      },
      { $sort: { count: 1 } }
    ]);

    res.json(results);
  } catch (error) {
    console.error("sortedDefects error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 3) Defects by day of the week (weekly)
exports.weeklyDayDefects = async (req, res) => {
  try {
    const results = await Orders.aggregate([
      { $unwind: "$results" },
      { $unwind: "$results.detections" },
      { $unwind: "$results.detections.defects" },

      {
        $group: {
          _id: { day: { $dayOfWeek: "$dateImpression" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          day: "$_id.day",
          count: 1,
          _id: 0
        }
      },
      { $sort: { day: 1 } }
    ]);

    res.json(results);
  } catch (error) {
    console.error("weeklyDayDefects error:", error);
    res.status(500).json({ error: error.message });
  }
};

// 4) Validation ratio (valid vs invalid)
exports.validationRatio = async (req, res) => {
  try {
    const validCount = await Orders.countDocuments({ validated: true });
    const invalidCount = await Orders.countDocuments({ validated: false });
    res.json({ valid: validCount, invalid: invalidCount });
  } catch (error) {
    console.error("validationRatio error:", error);
    res.status(500).json({ error: error.message });
  }
};
