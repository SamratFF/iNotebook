// Importing the required modules
const connectToMongo = require('./db');
const express = require('express');


// HOSTNAME AND PORT
const hostname = '127.0.0.1';
const port = 8000;

// MONGO SPECIFIC STUFF
connectToMongo();


// EXPRESS SPECIFIC STUFF
const app = express();
app.use(express.json());


// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// LISTENING THE APP
app.listen(port, () => {
     console.log(`The server is listening on http://${hostname}:${port}/`);
});