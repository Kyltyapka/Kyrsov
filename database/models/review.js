// models/review.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config'); // Змінено імпорт

const Review = sequelize.define('Review', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewers: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Review;
