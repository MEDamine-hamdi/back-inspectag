const Commande = require('../models/Commande');

// 1. Average Similarity per Agent
exports.avgSimilarityPerAgent = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      {
        $group: {
          _id: "$agent",
          avgSimilarity: { $avg: "$average_similarity" },
          ordersCount: { $sum: 1 }
        }
      },
      { $sort: { avgSimilarity: -1 } }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Number of Validated vs Non-Validated Orders
exports.validationRatio = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      {
        $group: {
          _id: "$validé",
          count: { $sum: 1 }
        }
      }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Monthly Number of Orders
exports.monthlyOrders = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      // 1) Ensure dateImpression is a Date
      {
        $addFields: {
          dateImp: { $toDate: "$dateImpression" }
        }
      },
      // 2) Group by year/month of that Date
      {
        $group: {
          _id: {
            year:  { $year:  "$dateImp" },
            month: { $month: "$dateImp" }
          },
          count: { $sum: 1 }
        }
      },
      // 3) Format and sort
      {
        $project: {
          _id: 0,
          year:  "$_id.year",
          month: "$_id.month",
          count: 1
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    res.json(results);
  } catch (err) {
    console.error("monthlyOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 4. Average Similarity Over Time (monthly)
exports.avgSimilarityOverTime = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      // 1) Coerce to Date
      {
        $addFields: {
          dateImp: { $toDate: "$dateImpression" }
        }
      },
      // 2) Group by year/month
      {
        $group: {
          _id: {
            year:  { $year:  "$dateImp" },
            month: { $month: "$dateImp" }
          },
          avgSimilarity: { $avg: "$average_similarity" }
        }
      },
      // 3) Project
      {
        $project: {
          _id: 0,
          year:          "$_id.year",
          month:         "$_id.month",
          avgSimilarity: 1
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);

    res.json(results);
  } catch (err) {
    console.error("avgSimilarityOverTime error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 5. Distribution of Similarity Percentages (Buckets)
exports.similarityDistribution = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      {
        $bucket: {
          groupBy: "$average_similarity",
          boundaries: [0, 50, 75, 90, 100],
          default: "Other",
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Top Companies by Number of Orders
exports.topCompaniesByOrders = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      {
        $group: {
          _id: "$nomEntreprise",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Average Similarity per Company
exports.avgSimilarityPerCompany = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      {
        $group: {
          _id: "$nomEntreprise",
          avgSimilarity: { $avg: "$average_similarity" },
          ordersCount: { $sum: 1 }
        }
      },
      { $sort: { avgSimilarity: -1 } }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 8. Most Frequent Label Crop Filenames
exports.mostFrequentLabelCrop = async (req, res) => {
  try {
    const results = await Commande.aggregate([
      { $unwind: "$comp" },
      {
        $group: {
          _id: "$comp.label_crop_filename",
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
