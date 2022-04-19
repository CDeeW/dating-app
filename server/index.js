const PORT = 8000;

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json('hi');
});

app.listen(PORT, () => console.log('Server running on Port: ' + PORT));
