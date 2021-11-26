const express = require('express')
const app = express()

app.use(express.json())
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    // handle OPTIONS method
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});

module.exports = app