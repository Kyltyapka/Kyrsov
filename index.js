const express = require('express');
const path = require('path');
const sequelize = require('./database/config').sequelize; 

const reviewsRoutes = require('./routes/reviews');

const app = express();
const port = 3000;

// З'єднання з базою даних
sequelize.authenticate()
  .then(() => {
    console.log('З\'єднання з базою даних встановлено');
  })
  .catch((err) => {
    console.error('Помилка з\'єднання з базою даних:', err);
  });

// Налаштовуємо шаблонізатор та шлях 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Статичний middleware для роботи зі статичними файлами
app.use(express.static('public'));

// Підключення маршруту для фільтрації оглядів
app.use('/api/review', reviewsRoutes);


// Шлях до головної сторінки
app.get("/", (req, res) => {
    res.render('index');
});

// Шлях до сторінки з оглядами фільмів
app.get("/movie_review", async (req, res) => {
  try {

    const { title, reviewers, release_date_from, release_date_to, rating_from, rating_to } = req.query;

    // Викликаємо маршрут для фільтрації оглядів та передаємо параметри
   
const response = await fetch(`http://localhost:3000/api/review/filter?title=${title}&reviewers=${reviewers}&release_date_from=${release_date_from}&release_date_to=${release_date_to}&rating_from=${rating_from}&rating_to=${rating_to}`);

    
    const filteredReviews = await response.json();

    
    res.render('movie_review', { reviews: filteredReviews });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
1

// Шлях до сторінки зі збіркою фільмів
app.get("/collection", (req, res) => {
    res.render('collection');
});

// Шлях до сторінки входу
app.get("/login", (req, res) => {
    res.render('login');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
