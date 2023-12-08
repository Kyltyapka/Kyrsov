const express = require('express');
const { Op } = require('sequelize');
const Review = require('../database/models/review'); 

const router = express.Router();



// роут для фільтрації оглядів
router.get('/filter', async (req, res) => {
  try {
    const { title, reviewers, release_date_from, release_date_to, rating_from, rating_to } = req.query;
    const filteredReviews = await Review.findAll({
      where: {
        title: { [Op.like]: `%${title}%` },
        reviewers: { [Op.like]: `%${reviewers}%` },
        releaseDate: { [Op.between]: [release_date_from, release_date_to] },
        rating: { [Op.between]: [rating_from, rating_to] },
      },
    });

    res.json(filteredReviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
