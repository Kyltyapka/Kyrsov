const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("websiter", "root", "", {
    dialect: "mysql",
    host: "127.0.0.1",
});

const models = {};

// Отримуємо список файлів в поточній директорії
const files = fs.readdirSync(__dirname);


const modelFiles = files.filter(file => file !== 'index.js' && path.extname(file) === '.js');


modelFiles.forEach(file => {
  const model = require(`./${file}`);
  models[model.name] = model;
});


Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});


module.exports = {
  sequelize,
  ...models,
};
