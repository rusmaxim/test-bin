const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { priceRoutes } = require('./parts/price.routes');

const port = 3000;

app.use(bodyParser.json())

priceRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})