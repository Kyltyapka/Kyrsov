// models/movie.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config').sequelize;


const Movie = sequelize.define('Movie', {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATE,
  },
  duration: {
    type: DataTypes.TIME,
  },
  age_limit: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.ENUM('Film', 'Series', 'Cartoon', 'Cartoon series'),
    allowNull: false,
  },
});

module.exports = Movie;
