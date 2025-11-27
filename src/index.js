const app = require('./app');
const PORT = process.env.API_PORT;
const time = require('./controllers/timeController');

// time.globalTimer();

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});