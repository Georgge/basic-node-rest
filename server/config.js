/* --- Port --- */
process.env.PORT = process.env.PORT || 3000;

/* --- Enviroment --- */
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* --- Data Base --- */

let urlDB = null;

if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/coffe';
} else {
  urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;
