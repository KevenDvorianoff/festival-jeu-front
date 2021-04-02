const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'festival-jeu-front')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'festival-jeu-front', 'index.html'));
});

app.listen(process.env.PORT || 4200);