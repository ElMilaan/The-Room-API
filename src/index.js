const app = require('./app');
const PORT = process.env.APP_PORT || 3000;
const time = require('./controllers/timeController');

time.globalTimer();

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});